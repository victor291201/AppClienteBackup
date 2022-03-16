async function clickxadm(e){
     await e.addEventListener("click",()=>{console.log("hola")
         $.post("/eliminaradm",e.value).done(
             function(respuesta){
                alert( "Data Loaded: " + respuesta );
        })  
    })

}