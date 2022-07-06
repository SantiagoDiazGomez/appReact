import React, { useState, useEffect } from "react";
import {addVehicle, updateVehicle, getVehicle } from '../services/api'
import { useParams } from 'react-router';
import Moment from 'moment';

const Vehicle = () => {
    const { id } = useParams();

    const defaultVehicle = {
      id: null,
      numOrder: "",
      frame: "",
      model: "",
      licensePlate: "",
      deliveryDate: null
    }   
  
    const[vehicle, setVehicle]      = useState(defaultVehicle)
    const[submitted, setSubmitted]  = useState(false);

    const get = id => {
      getVehicle(id).then(response => { console.log(response.data); setVehicle(response.data); })
      .catch(e => { console.log(e); });
    }

    useEffect(() => { 
      if (id != "0") get(id)      
    }, []);
    
    const handleInputChange = event => {
        const { name, value } = event.target;
        setVehicle({ ...vehicle, [name]: value });
    };

    const saveVehicle = () => {
        var dataVehicle = {           
            NumOrder:       vehicle.numOrder,
            Frame:          vehicle.frame,
            Model:          vehicle.model,
            LicensePlate:   vehicle.licensePlate,
            DeliveryDate:   vehicle.deliveryDate
        }
        
        if (id == "0") {
          addVehicle(dataVehicle).then(res => {
            setVehicle({
                id:             res.data.Id,
                numOrder:       res.data.NumOrder,
                frame:          res.data.Frame,
                model:          res.data.Model,
                licensePlate:   res.data.LicensePlate,
                deliveryDate:   res.data.DeliveryDate
            })

            setSubmitted(true);
          }).catch(e => {
              console.log(e);
          });
        }
        else {
          dataVehicle.Id = id;
          
          updateVehicle(id, dataVehicle).then(res => {
            setVehicle({
                id:             res.data.Id,
                numOrder:       res.data.NumOrder,
                frame:          res.data.Frame,
                model:          res.data.Model,
                licensePlate:   res.data.LicensePlate,
                deliveryDate:   res.data.DeliveryDate
            })

            setSubmitted(true);
          }).catch(e => {
              console.log(e);
          });
        }        
    }

    const resetVehicle = () => {
        setVehicle(defaultVehicle);
        setSubmitted(false);
    }

    const formatDeliveryDate = vehicle.deliveryDate ? Moment(vehicle.deliveryDate).format('YYYY-MM-DD') : "";

    return (
        <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Petición enviada correctamente!</h4>
          <button className="btn btn-success" onClick={resetVehicle}>Refrescar</button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="Nº de pedido">Nº de pedido</label>
            <input
              type="text"
              className="form-control"
              id="numOrder"
              required
              value={vehicle.numOrder}
              onChange={handleInputChange}
              name="numOrder"
            />
          </div>
          <div className="form-group">
            <label htmlFor="frame">Bastidor</label>
            <input
              type="text"
              className="form-control"
              id="frame"
              required
              value={vehicle.frame}
              onChange={handleInputChange}
              name="frame"
            />
          </div>
          <div className="form-group">
            <label htmlFor="model">Modelo</label>
            <input
              type="text"
              className="form-control"
              id="model"
              required
              value={vehicle.model}
              onChange={handleInputChange}
              name="model"
            />
          </div>
          <div className="form-group">
            <label htmlFor="licensePlate">Matrícula</label>
            <input
              type="text"
              className="form-control"
              id="licensePlate"
              required
              value={vehicle.licensePlate}
              onChange={handleInputChange}
              name="licensePlate"
            />
          </div>
          <div className="form-group">
            <label htmlFor="deliveryDate">Fecha de entrega</label>
            <input
              type="date"
              className="form-control"
              id="deliveryDate"
              required
              value={formatDeliveryDate}
              onChange={handleInputChange}
              name="deliveryDate"
            />
          </div>
          <button onClick={saveVehicle} className="btn btn-success">
            Guardar
          </button>
        </div>
      )}
    </div>
    );
};

export default Vehicle;