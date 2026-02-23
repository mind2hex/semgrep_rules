
function foo(params: { sink: string }): string {

    const { sink } = params;

    // ruleid: javascript-taint-184-lack-of-data-validation-zpl-injection
    const zpl = `
        ^XA
        ^XFE:${!tipoEtiqueta ? 'ETIQUETA' : 'ETIQUETA10X10'}^FS
        ^FN1^FD${sink}^FS
        ^XZ`
        .trim()
        .replace(/\n/g, '');
    return zpl;
}   
