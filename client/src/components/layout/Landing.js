import React, { useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [formData, setFormData] = useState({
    numpia: "",
  });

  const { numpia } = formData;

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="text-primary">
            <strong>Delivery 593</strong>
          </h1>
          <p className="lead">Ingrese el número de PIA</p>
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={(e) => onSubmitHandler(e)}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              name="numpia"
              value={numpia}
              onChange={(e) => onChangeHandler(e)}
              placeholder="Número de PIA"
              aria-label="Search"
              required
            />
            <Link
              to={`/locations/${numpia}`}
              className="btn btn-outline-primary my-2 my-sm-0"
            >
              Buscar
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Landing;
