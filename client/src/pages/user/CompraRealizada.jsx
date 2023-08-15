import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompraRealizada() {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const direccion = JSON.parse(localStorage.getItem("direccion"));
  const { calle, ciudad, codigoPostal, provincia } = direccion;

  const url = "https://back-pgvinos.herokuapp.com";

  // const url = "http://localhost:3001" 
  

  useEffect(() => {
    user &&
      axios.post(`${url}/email`, {
        subject: 'Confirmacion de compra',
        to: user.email,        
        html: `<table style="margin:0 auto; width: 600px; font-family: 'Poppins', sans-serif;">
        <tr>
          <td style="background: #000;">
            <a href="https://pg-vinos.vercel.app/">
              <img
                src="https://i.ibb.co/0Qz9q5W/logo.png"
                alt="logo"
                width="200"
                height="200"
                style="margin: 0 400px"
              />            
            </a>
            <p style="color: white; margin: 5px 200px; font-style: oblique; width: 300px;">GRACIAS POR SU COMPRA!!!</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 200px;">
            <p>Estimado <b>${user.nickname}</b> su compra ha sido confirmada</p>
  
            <p>La misma sera remitada a la direccion:</p>
            <ul>
              <li>Calle: ${calle}</li>
              <li>Ciudad: ${ciudad}</li>
              <li>Provincia: ${provincia}</li>
              <li>Codigo Postal: ${codigoPostal}</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 200px;">
            <p>Gracias por elegirnos, de parte del equipo de PGVinos</p>
            <img
              src="https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/comer/vinos-y-bodegas/6-vinos-para-tomar-en-pareja/gr-cms-media-featured_images-none-240de756-c646-49a4-8995-9f2cfcd74f5b-2.jpg"
              alt="brindis"
              width="150 "
              height="150"
              style="margin: 0 150px"
            />
            <div style="margin: 0 50px; background: #000; color: white; width: 400px; padding: 20px;">
              <div style="margin: 0 70px; font-style: oblique;">
              Visitenos en
              <a
                href="https://pg-vinos.vercel.app/"
                target="_blank"
                style="text-decoration: none; color: white;"
                >pg-vinos.vercel.app</a
              >
          </div>
            </div>
          </td>
        </tr>
      </table>
        `,
      });
  }, [user, calle, ciudad, codigoPostal, provincia]);

  return (
    <div className="grid justify-center content-around">
      {user && (
        <div className="mt-5">
          <h1 className="text-[30px] text-indigo-600 font-bold ml-10">Gracias por su compra {user.nickname}!</h1>
          <p className="text-italic">
            Le enviamos un mail a la direccion {user.email} con
            el detalle de la misma
          </p>
        </div>
      )}
      <img
        src="https://img.freepik.com/fotos-premium/dos-vasos-vino-tinto-tintinean-brindis_124595-259.jpg?w=2000"
        alt=""
        className="w-96 mb-10 mx-auto"
      />
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => navigate("/", { replace: true })}
      >
        Volver a Home
      </button>
    </div>
  );
}

export default CompraRealizada;
