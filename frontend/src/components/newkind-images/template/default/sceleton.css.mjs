export default () => {

    return`
.audio-newkind__form {
  max-width: 100%;
  margin: 1rem auto 1rem;
  font-family: 'Roboto', sans-serif;
  color: black;
}

.audio-newkind__radio + label:hover {
  cursor: pointer;
}

.audio-newkind__radio {
  display: none;
}

.audio-newkind__radio + label span {
  border: 2px solid #fff;
  border-radius: 80%;
  font-size: 1rem;
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 4px 8px 8px 8px;
  padding: 2px;
  text-align: center;
  vertical-align: middle;
}

.audio-newkind__radio:checked + label span {
  background: #7694f4;
}

.audio-newkind {
  width: 100%;
}

.audio-newkind__title {
  margin-bottom: 0.5rem;
  font-family: 'Oleo Script', cursive;
  font-size: 2.5em;
  text-align: center;
  color: black;
}

.audio-newkind__btn {
  appearance: none;
  border: none;
  border-radius: 4px;
  box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, .4), 2px 6px 10px 0px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 200px;
  margin: auto;
  display: flex;
  justify-content: center;
  outline: none;
  margin-top: 0.75rem;
  padding: 1em;
  position: relative;
  z-index: 1;
  font-family: 'Roboto', sans-serif;
  font-size: 0.875rem;
  background: #5FA0FB;
  color: black;
}

.audio-newkind__btn:hover {
    cursor: pointer;
}

#oscilloscope {
  border-top: 4px solid #e6ebf1;
  border-bottom: 4px solid #e6ebf1;
  height: 200px;
  width: 100%;
  background-color: darken(#7694f4, 40%);
  //background-color: #7694f4;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-position: -35px 95%;
}
`
}