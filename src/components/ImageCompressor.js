import { Component } from 'react';
import imageCompression from 'browser-image-compression';
import Card from 'react-bootstrap/Card';


export default class ImageCompressor extends Component {
    state ={
        enlaceComprimido: "https://www.pngall.com/wp-content/uploads/2/Downloadable-PDF-Button-PNG-Image.png",
        imagenOriginal: "",
        linkOriginal:"",
        clickeado: false,
        imagenSubida: false,
    }

    manejadorDeArchivo = e => {

        const archivoDeLaImagen = e.target.files[0];

        this.setState({
            linkOriginal: URL.createObjectURL(archivoDeLaImagen),
            imagenOriginal: archivoDeLaImagen,
            nuevoArchivo: archivoDeLaImagen.name,
            imagenSubida: true
        })
    }

    manejadorDeEnlaceComprimido = e => {
        
        e.preventDefault();

        const opciones = {
            tamnioMinimo: 1,
            anchoAltoMinimo: 500,
            useWebWorker: true
        }

        if (opciones.tamnioMinimo >= this.state.imagenOriginal.size / 1024) {
            alert("La imagen es muy pequeña")
            return 0;
        }

        let output;

        imageCompression(this.state.imagenOriginal, opciones).then(x => {

            output = x;

            const enlaceDeDescarga = URL.createObjectURL(output);

            this.setState({
                
                enlaceComprimido: enlaceDeDescarga
            })

        })
        
        this.setState({clickeado: true})

        return;

    }

    render(){
        return(
            <div className='m-10'>
                <div className='text-lihgt text-center'>
                <h1>Compresor de imagenes</h1>
                <h3>Sube tu imagen</h3>
                <h3>Da click sobre el botón comprimir</h3>
                <h3>Da click sobre el botón descargar</h3>
                </div>


                <div className='row mt-5'>
                    <div className='col-xl-4 col-lg4 col-md-12 col-sm-12'>
                        {
                        this.state.imagenSubida ?
                        <Card.Img className='ht' variant='top' src={this.state.linkOriginal} alt={""}/>
                        :
                        <Card.Img className='ht' variant='top' src='https://www.pngmart.com/files/3/Upload-Button-PNG-Image.png' alt={""}/>
                        }
                    </div>
                    <div className='d-flex justify-content'>
                        <input className='mt-2 btn btn-dark w-70' type="file" accept='image/*' onChange={e => this.manejadorDeArchivo(e)} />
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4 nb-5 mt-5 col-sm-12 d-flex justify-content-center align-item-baseline'>
                        <br></br>
                        {
                            this.state.nuevoArchivo ?
                            <button className='btn btn-dark' type='button' onClick={e => this.manejadorDeEnlaceComprimido(e)}>Comprimir</button>
                            :
                            <></>
                        }
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3'>
                        <Card.Img variant="top" src={this.state.enlaceComprimido} alt={""} />
                        {
                            this.state.clickeado ?
                            <div className='d-flex justify-content-center'>
                                <a className='mt-2 btn btn-dark w-75' href={this.state.enlaceComprimido} download={this.state.nuevoArchivo}>Descargar</a>
                            </div>
                            :
                            <></>
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
    
}

