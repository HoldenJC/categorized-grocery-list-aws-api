import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Example } from './backend-code';

let example = new Example();

$(document).ready(function() {
  $("#test").append(example.name);
  example.exampleMethod();
  $("#test").append(example.name);
});
