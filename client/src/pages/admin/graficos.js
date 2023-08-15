/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersGraf } from "../../actions/action";
//import { Link } from "react-router-dom";
//import logo from "../../assets/logo.png";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler }
    from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler)

export default function Graficos() {
    const dispatch = useDispatch();
    const { ordersUser } = useSelector(state => state)
    const [muestro,setMuestro]=useState(0)

    const [input, setInput] = useState({
        fechaInicio: "",
        fechaFin: ""
    });

    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };
    const enviarDatos = (e) => {
        e.preventDefault(e);
      
        //Podríamos cambiar el título según el mes de búsqueda
        if (input.fechaInicio !== "" && input.fechaFin !== ""){
            setMuestro(1)
        }
        //cambiar estado  de redux para despachar una acción que traiga datos
        //filtrados por la búsqueda
    };

    let fecha = new Date();
    var opciones = { month: "long" };
    // eslint-disable-next-line no-unused-vars
    let mes = fecha.toLocaleDateString("es-ES", opciones);

    useEffect(() => {
        console.log('muestro: ', muestro);
        if (muestro === 1 ){
            dispatch(getOrdersGraf(input.fechaInicio,input.fechaFin));
            setMuestro(0)
        }
    }, [muestro]);

    if (ordersUser) {
        let gra = ""
        let grat = ""
        var graph = []
        var graphTipo = []
        for (var i = 0; i < ordersUser.length; i++) {
            var element = ordersUser[i];
            if (ordersUser[i].estado === 'Creada' || ordersUser[i].estado === 'Procesando' || ordersUser[i].estado === 'Completo') {
                //            console.log('Categoria: ', ordersUser[0].order_items[0].product.category.type);
                for (var z = 0; z < element.order_items.length; z++) {
                    var azucar = element.order_items[z].product.category.degreeSugar;
                    var tipo = element.order_items[z].product.category.type;
                    var cantidad = element.order_items[z].quantity;
                    gra = ""
                    for (var x = 0; x < graph.length; x++) {
                        //console.log('voy por : ', ventas[x].id);
                        if (graph[x].tipo === tipo && graph[x].azucar === azucar) {
                            var cantTot = graph[x].cant + cantidad
                            graph[x].cant = cantTot
                            gra = "ok"
                            break
                        }
                    }
                    if (gra === "") {
                        graph.push({ "azucar": azucar, "tipo": tipo, "cant": cantidad })
                    }
                    grat = ""
                    for (var x2 = 0; x2 < graphTipo.length; x2++) {
                        //console.log('voy por : ', ventas[x].id);
                        if (graphTipo[x2].tipo === tipo) {
                            var cantTot1 = graphTipo[x2].cant + cantidad
                            graphTipo[x2].cant = cantTot1
                            grat = "ok"
                            break
                        }
                    }
                    if (grat === "") {
                        graphTipo.push({ "tipo": tipo, "cant": cantidad })
                    }
                }
            }
        }
        console.log('graph: ', graph);
        var scores = [];
        var labels = []
        for (var g = 0; g < graph.length; g++) {
            scores.push(graph[g].cant);
            labels.push(`${graph[g].tipo} ${graph[g].azucar}`);
        }

        //    const data = useMemo(function () {
        const data = {
            datasets: [{
                label: "Mis datos",
                data: scores,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,

            }],
            labels
        }

        scores = [];
        labels = []
        for (var g2 = 0; g2 < graphTipo.length; g2++) {
            scores.push(graphTipo[g2].cant);
            labels.push(`${graphTipo[g2].tipo}`);
        }


        const data2 = {
            datasets: [{
                label: "Tipo",
                data: scores,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,

            }],
            labels
        }

        // Busco datos a mostrar 
        return (
            <>            
                <br />
                <div style={{ width: `90%`, height: `10%` }}>
                    <form onSubmit={enviarDatos}>
                        <div className="col-md-3">Seleccione fechas <b>Desde</b>&nbsp;
                            <input
                                type="date"
                                className="form-control"
                                onChange={handleInputChange}
                                name="fechaInicio"
                            ></input>
                            &nbsp;&nbsp;&nbsp;
                            <b>Hasta</b>&nbsp;
                            <input
                                type="date"
                                className="form-control"
                                onChange={handleInputChange}
                                name="fechaFin"
                            ></input>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                            className=" bg-indigo-600 px-4 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                             type="submit">Buscar</button>
                        </div>
                    </form>
                    <br />
                </div>
                <div className="flex">
                    <div className="lg:w-1/2 border p2">
                        <h2 className="text-gray-600 font-semibold">Grafico de ventas por Categorias</h2>
                        <div>
                            <Bar data={data}
                                options={{ maintainAspectRatio: true }}
                            />

                        </div>
                    </div>
                    &nbsp;
                    <div className="lg:w-1/2 border p2">
                        <h2 className="text-gray-600 font-semibold">Grafico de ventas Variedad</h2>
                        <div>
                            <Bar data={data2}
                                options={{ maintainAspectRatio: true }}
                            />

                        </div>
                    </div>
                </div>
                <br />
                <div>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        className=" bg-indigo-600 px-4 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                        onClick={() => (window.location.href = '/admin/ventas')}>
                        Volver a Ventas
                    </button>
                </div>
            </>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}
