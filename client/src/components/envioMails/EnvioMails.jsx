export default function enviarMail(estado, to, id, total, productos) {
  if (estado === "Completo") {
    return {
      subject: "Compra Completada",
      to,
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
      </td>
    </tr>
    <tr>
      <td style="padding:0 200px;">
        <p>Estimado su compra #<b>${id}</b> ha sido completada y sera despachada en las proximas 24hs</p>
        <p>Detalle de su compra:</p>
        <ul>        
        ${productos.map(item => {
          return "<li>"+item.product.name+" cantidad x " + item.quantity+"</li>"
        })}            
              
        </ul>

        <p>Total $ ${total}</p>

        <br>
        <br>
       
      </td>
    </tr>
    <tr>
      <td style="padding:10px 200px;">
     
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
    `
    };
  }

  if (estado === "Cancelada") {
    return {
      subject: "Compra cancelada",
      to,
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
        </td>
      </tr>
      <tr>
        <td style="padding:0 200px;">
        <p>Lamentamos informarle que su compra #${id} ha sido cancelada</p>

        <p>En las proximas 48hs estara recibiendo el reembolso de ${total}</p>

        <br>
            
        <p>Le pedimos disculpas por los inconvenientes ocasionados.</p>

        <br>
  
        <p>Lo saluda cordialmente el equipo de <b>PGVinos</b></p>          
          
         
        </td>
      </tr>
      <tr>
        <td style="padding:10px 200px;">
       
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
      `
    };
  }

  if (estado === "Procesar") {
    return {
      subject: `Actualizacion sobre su compra #${id}`,
      to,
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
        </td>
      </tr>
      <tr>
        <td style="padding:0 200px;">
          <p>Estimado su compra <b>#${id}</b> esta siendo procesada</p> 

          <p>Recibira un nuevo email cuando la misma haya sido despachada</p>
          
          <p>Lo saluda cordialmente el equipo de <b>PGVinos</b></p>          
          
         
        </td>
      </tr>
      <tr>
        <td style="padding:10px 200px;">
       
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
    };
  }
}
