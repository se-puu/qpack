export function isEqualBinary(a:Uint8Array, b:Uint8Array):boolean {
    if(a.length !== b.length){
        return false;
    }
    for(let i = 0; i < a.length; i++){
        if(a[i] !== b[i]){
            console.log(i)
            return false;
        }
    }
    return true;
}