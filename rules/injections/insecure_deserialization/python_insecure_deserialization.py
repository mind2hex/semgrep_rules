# EXAMPLE 1
if __name__ == "__example1__":
    import pickle
    import socket

    s = socket.socket()
    s.connect(("10.0.0.1", 9999))
    data = s.recv(4096)         
    obj = pickle.loads(data)    
    print(obj)

    # FP
    pickle.load("ladsad")
    pickle.asdasdsa(asdasdas)

# EXAMPLE 2
if __name__ == "__example2__":    
    # vulnerable_yaml.py
    import yaml
    from flask import request

    def handle_request():
        raw = request.data.decode()
        data = yaml.load(raw)   
        return data

# EXAMPLE 3
if __name__ == "__example3__":
    # vulnerable_yaml2.py
    import yaml
    raw = open("user_input.yaml").read()
    obj = yaml.unsafe_load(raw)   # ❌ explícitamente inseguro
    # or
    obj2 = yaml.load(raw, Loader=yaml.FullLoader)

    # FP
    yaml.adasdsaa(adasdsa)

# EXAMPLE 4
if __name__ == "__example4__":
    # vulnerable_marshal.py
    import marshal
    obj = marshal.loads(payload)   
