import { isEqual } from "..";
import { ExtRegistry } from "../../../src/lib/ext-registry";

export function isEqualArray(a:unknown[], b:unknown[],handler:ExtRegistry):boolean {
    // console.log("Array compare",a,b);
    if(a.length !== b.length){
        return false;
    }
    for(let i = 0; i < a.length; i++){
        if(!isEqual(a[i], b[i],handler)){
            return false;
        }
    }
    return true;
}