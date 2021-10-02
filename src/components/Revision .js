import React, {Fragment, useState} from 'react'

const Revision = () => {
    const [datos,setDatos] = useState({
        one: '',       
        two:'',       
        three: '',       
        for:'',       
        five: '',      
        six:'', 
        seven:'',
        comment:''
    })
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }  
    const enviarDatos = (event) =>{
        event.preventDefault()
        console.log('Al Backend')
    }

    return (
        <Fragment>
        <form className="card bg-dark " onSubmit={enviarDatos}  >
            <div className = "card-body text-light" style={{margin: 55}}>
                <h1 className="card-title text-center  " style={{margin: 30}}>REVISIÓN TIS</h1> 
                    {/* 1 */}
                    <div className="row " style={{margin: 10,marginTop:50}}>
                            <div className="col-md-9">
                                    <h4>
                                            Cumplimiento de 
                                            especicaciones del proponente
                                    </h4>          
                            </div>
                            <div className="col-md-1">
                                    <input 
                                        type="text" 
                                        className="form-control"              
                                        name="one" 
                                        onChange={handleInputChange}
                                    ></input>         
                            </div>
                            <div className="col-md-2">
                                    <h4>/15 puntos </h4>         
                            </div>
                    </div>     
                    {/* 2 */}
                    <div className="row " style={{margin: 10}}>
                            <div className="col-md-9">
                                    <h4>
                                            Claridad en la organizacion 
                                            de la empresa proponente 
                                    </h4>          
                            </div>
                            <div className="col-md-1">
                                    <input 
                                        type="text" 
                                        className="form-control"              
                                        name="two" 
                                        onChange={handleInputChange}
                                        
                                    ></input>         
                               </div>
                            <div className="col-md-2">
                                    <h4>/10 puntos </h4>         
                            </div>
                    </div>    

                    {/* 3 */}
                    <div className="row " style={{margin: 10}}>
                            <div className="col-md-9">
                                    <h4>
                                            Claridad en la organizacion 
                                            de la empresa proponente 
                                    </h4>          
                            </div>
                            <div className="col-md-1">
                                    <input 
                                        type="text" 
                                        className="form-control"              
                                        name="three" 
                                        onChange={handleInputChange}
                                        
                                    ></input>         
                            </div>
                            <div className="col-md-2">
                                    <h4>/30 puntos </h4>         
                            </div>
                    </div> 

                    {/* 4 */}
                    <div className="row " style={{margin: 10}}>
                            <div className="col-md-9">
                                    <h4>
                                            Claridad en el proceso 
                                            de desarrollo  
                                    </h4>          
                            </div>
                            <div className="col-md-1">
                                    <input 
                                        type="text" 
                                        className="form-control"              
                                        name="for" 
                                        onChange={handleInputChange}
                                        
                                    ></input>        
                            </div>
                            <div className="col-md-2">
                                    <h4>/10 puntos </h4>         
                            </div>
                    </div>  
                    {/* 5 */}
                    <div className="row " style={{margin: 10}}>
                            <div className="col-md-9">
                                    <h4>Plazo de ejecucion</h4>          
                            </div>
                            <div className="col-md-1">
                                    <input 
                                        type="text" 
                                        className="form-control"              
                                        name="five" 
                                        onChange={handleInputChange}
                                        
                                    ></input>  
                            </div>
                            <div className="col-md-2">
                                    <h4>/10 puntos </h4>         
                            </div>
                    </div>  
                    {/* 6 */}
                    <div className="row " style={{margin: 10}}>
                            <div className="col-md-9">
                                    <h4>Precio total </h4>          
                            </div>
                            <div className="col-md-1">
                                    <input 
                                        type="text" 
                                        className="form-control"              
                                        name="six" 
                                        onChange={handleInputChange}
                                        
                                    ></input> 
                            </div>
                            <div className="col-md-2">
                                    <h4>/15 puntos </h4>         
                            </div>
                    </div>  
                    {/* 7 */}
                    <div className="row " style={{margin: 10}}>
                            <div className="col-md-9">
                                    <h4>
                                            Uso de herramientas en 
                                            el proceso de desarrollo  
                                    </h4>          
                            </div>
                            <div className="col-md-1">
                            <input 
                                        type="text" 
                                        className="form-control"              
                                        name="seven" 
                                        onChange={handleInputChange}
                                        
                                    ></input> 
                            </div>
                            <div className="col-md-2">
                                    <h4>/10 puntos </h4>         
                            </div>
                    </div>    

                    <div className="" style={{marginTop:60}}>
                            <h2>Comentario</h2>
                            <textarea 
                                        className="form-control" 
                                        id="Textarea1" 
                                        rows="3" 
                                        name="comment"
                                        onChange={handleInputChange}>
                             </textarea>             
                    </div>                                       
                     <div className="text-center" >
                                <button  type="submit" className="btn btn-primary btn-onle " style={{margin: 30, fontSize:24}}>REVISADO</button> 
                     </div>
            </div>
            
        </form>
        </Fragment>
        
    )
}

export default Revision


