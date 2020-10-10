import React, { useState, useEffect } from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import styles from "./PickCountry.module.css";
import axios from "axios";

const PickCountry = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountry();
  }, []);
  function getCountry() {
    axios
      .get("https://covid.mathdro.id/api/countries")
      .then((response) => {
        // console.log(response.data.countries);
        let { countries } = response.data;
        countries = countries.map((item) => item.name);
        setCountries(countries);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect onChange={(event) => handleCountryChange(event)}>
        <option value="">Global</option>
        {countries.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default PickCountry;
