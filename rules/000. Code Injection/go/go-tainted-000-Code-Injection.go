// EXAMPLE 1: govaluate
func handler(w http.ResponseWriter, r *http.Request) {
	// Entrada controlada por el usuario
	expr := r.URL.Query().Get("expr")

	// ❌ Code injection: el usuario controla la expresión que será evaluada
	// ruleid: go-tainted-000-Code-Injection
	evalExpr, err := govaluate.NewEvaluableExpression(expr)
	//... SNIP ...
}

// EXAMPLE 2: simple evaluate
func runScriptHandler(w http.ResponseWriter, r *http.Request) {
	// El usuario manda "código Go" en el body
	script, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "bad request", 400)
		return
	}

	i := interp.New(interp.Options{})
	i.Use(stdlib.Symbols)

	// ❌ Code injection: interpreta código controlado por el usuario
	// ruleid: go-tainted-000-Code-Injection
	_, err = i.Eval(string(script))
	if err != nil {
		slog.Error("script error", "err", err)
		http.Error(w, "script error", 500)
		return
	}

	w.Write([]byte("ok"))
}

// EXAMPLE 3
func javascriptHandler(w http.ResponseWriter, r *http.Request) {
	// Usuario manda JS
	code := r.URL.Query().Get("js")

	vm := otto.New()
	// ❌ Code injection: ejecución de JS controlado por el usuario
	// ruleid: go-tainted-000-Code-Injection
	if _, err := vm.Run(code); err != nil {
		http.Error(w, "error", 500)
		return
	}
	w.Write([]byte("ok"))
}

// EXAMPLE 4
func handlerExpr(w http.ResponseWriter, r *http.Request) {
	// User-controlled
	program := r.URL.Query().Get("prog")

	env := map[string]interface{}{
		"role": "user",
		"id":   123,
	}

	// ❌ Code injection: el usuario controla el programa que se compila/evalúa
	// ruleid: go-tainted-000-Code-Injection
	compiled, err := expr.Compile(program, expr.Env(env))
	if err != nil {
		http.Error(w, "bad expr", 400)
		return
	}
	// ruleid: go-tainted-000-Code-Injection
	out, err := expr.Run(compiled, env)
	if err != nil {
		http.Error(w, "runtime error", 500)
		return
	}

	w.Write([]byte(out.(string)))
}

// EXAMPLE 5
func handlerGval(w http.ResponseWriter, r *http.Request) {
	// User-controlled
	query := r.FormValue("query")

	params := map[string]interface{}{
		"balance": 1000,
	}

	// ❌ Code injection: expresión controlada por el usuario
	// ruleid: go-tainted-000-Code-Injection
	result, err := gval.Evaluate(query, params)
	if err != nil {
		http.Error(w, "bad expr", 400)
		return
	}

	w.Write([]byte(result.(string)))
}

// EXAMPLE 6
func luaHandler(w http.ResponseWriter, r *http.Request) {
	script := r.FormValue("script") // user-controlled

	L := lua.NewState()
	defer L.Close()

	// ❌ Code injection: ejecución de script Lua controlado por el usuario
	// ruleid: go-tainted-000-Code-Injection
	if err := L.DoString(script); err != nil {
		http.Error(w, "lua error", 500)
		return
	}

	w.Write([]byte("ok"))
}


// EXAMPLE 7
func starlarkHandler(w http.ResponseWriter, r *http.Request) {
	src := r.FormValue("script") // user-controlled

	thread := &starlark.Thread{Name: "req"}

	// ❌ Code injection: interpreta código Starlark controlado por el usuario
	// ruleid: go-tainted-000-Code-Injection
	globals, err := starlark.ExecFile(thread, "user.star", src, nil)
	if err != nil {
		http.Error(w, "starlark error", 500)
		return
	}

	_ = globals
	w.Write([]byte("ok"))
}

// EXAMPLE 8
func pluginHandler(w http.ResponseWriter, r *http.Request) {
	// p.ej. "?name=report"
	name := r.URL.Query().Get("name")

	// ❌ Code injection / dynamic code loading:
	// se carga un .so basado en input del usuario
	// ruleid: go-tainted-000-Code-Injection
	p, err := plugin.Open("./plugins/" + name + ".so")
	if err != nil {
		http.Error(w, "load error", 500)
		return
	}

	sym, err := p.Lookup("Handler")
	if err != nil {
		http.Error(w, "symbol error", 500)
		return
	}

	if handler, ok := sym.(func(http.ResponseWriter, *http.Request)); ok {
		handler(w, r)
		return
	}

	http.Error(w, "invalid handler", 500)
}

// EXAMPLE 9
func wasmHandler(w http.ResponseWriter, r *http.Request) {
	// Usuario sube un módulo WASM
	wasmBytes, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "bad request", 400)
		return
	}

	ctx := context.Background()
	rt := wazero.NewRuntime(ctx)
	defer rt.Close(ctx)

	// ❌ Code injection: se instancia un módulo WASM controlado por el usuario
	// ruleid: go-tainted-000-Code-Injection
	mod, err := rt.InstantiateModuleFromBinary(ctx, wasmBytes)
	if err != nil {
		http.Error(w, "wasm error", 500)
		return
	}
	defer mod.Close(ctx)

	w.Write([]byte("ok"))
}

