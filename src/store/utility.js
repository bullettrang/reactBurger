//utility.js file

export const updateObject = (oldObject,updatedProperties)=>{
    return{
        ...oldObject,
        ...updatedProperties
    };
}