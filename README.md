# ECUADOR VALIDATOR DOCUMENTS

Validator for Ecuadorian Identification Documents  
Validator para las identificaciones de los principales documentos usados en Ecuador: Cédula, ruc, teléfono fijo,
teléfono celular, placas de vehiculos y motos, codigo postal y más datos.

## Installation

To install this package, use npm:

```sh
npm install ec-docs-validator
```

## Getting Started

### Importing the Library

Javascript:

```sh
const validator = require('ec-docs-validator')
```

Typescript:

```sh
import validator from 'ec-docs-validator'
```

### Usage

```sh
validator.ci(ci);
validator.ruc(ruc);
validator.cellphone(cellphone);
validator.telephone(telephone);
validator.plates(plate);
validator.zipCode(zipCode);
```

And you can use it like this:

```sh
validator.ci('1710034065'); // true
validator.ci('1234567890'); // false
validator.ruc('1804384731001'); // true
validator.ruc('1234567890123'); // false
validator.cellphone('0983484667'); // true
validator.cellphone('0884784667'); // false
validator.telephone('022895741'); // true
validator.telephone('022895741'); // true
validator.plates('PBA0389'); // true
validator.plates('IS150D'); // true
validator.plates('PBA038'); // false
validator.zipCode('128456'); // true
validator.zipCode('21456'); // false
```

## Testing

To run the tests, use the following command:

```sh
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author - Contact

Fernando Guevara Bayas - [Website](https://portfolio-ggt.pages.dev)
