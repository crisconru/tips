import { ChangeEvent, SyntheticEvent, useState } from "react"

const checkedFields = ['Gender', 'Games', 'Football', 'Basketball', 'Arts', 'Submit']

const provincesByCountry = {
    'Spain': ['Madrid'],
    'Mexico': ['Guadalajara']
} 

const printFields = (childNodes: HTMLInputElement[]) => {
  for (let childNode of childNodes) {
    if (
      childNode.name
      && 
      (!checkedFields.includes(childNode.name) || childNode.checked)
      &&
      childNode.value
    ){
      console.log(`${childNode.name} = ${childNode.value}`)
    }
  }
}

interface State {
  provinces: string[]
}

const Formularido = () => {
  // Country & Provinces
  const [country, setCountry] = useState<State>({provinces: provincesByCountry['Spain']})
  const handleChangeCountry = ({target}: ChangeEvent<HTMLSelectElement>) => {
    if ( provincesByCountry.hasOwnProperty(target.value) ) setCountry({ provinces: provincesByCountry[target.value] })
  }
  // Result
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    printFields(e.target.childNodes)
  }
  // Render
  return <form onSubmit={handleSubmit}>
    {/* NAME */}
    <label htmlFor="Name">Name</label>
    <input type="text" name="Name" id="Name" />
    <br />
    {/* FIRST NAME */}
    <label htmlFor="Firstname">Firstname</label>
    <input type="text" name="Firstname" id="Firstname"/>
    <br />
    {/* DESCRIPTION */}
    <label htmlFor="Description">Name</label>
    <textarea name="Description" id="Description"/>
    {/* GENDER */}
    <br />
    <label>Gender</label><br />
    <input type="radio" name="Gender" id="Non-Binary" value='Non-Binary'/>
    <label htmlFor="Non-Binary">Non binary</label>
    <br />
    <input type="radio" name="Gender" id="Female" value='Female'/>
    <label htmlFor="Female">Female</label>
    <br />
    <input type="radio" name="Gender" id="Male" value='Male'/>
    <label htmlFor="Male">Male</label>
    <br />
    {/* AGE */}
    <label htmlFor="Age">Age</label>
    <input type="number" name="Age" id="Age" min='1'/>
    <br />
    {/* COUNTRY */}
    <label htmlFor="Country">Country</label>
    <select name="Country" id="Country" onChange={handleChangeCountry}>
      {Object.keys(provincesByCountry).map(countri => <option key={countri} value={countri}>{countri}</option>)}
    </select>
    <br />
    {/* PROVINCE */}
    <label htmlFor="Province">Province</label>
    <select name="Province" id="Province">
      {country.provinces.map(province => <option key={province} value={province}>{province}</option>)}
    </select>
    <br />
    {/* HOBBIES */}
    <label>Hobbies</label><br />
    <label htmlFor="Games">Games</label>
    <input type="checkbox" name="Games" id="Games" value='Games'/>
    <br />
    <label htmlFor="Football">Football</label>
    <input type="checkbox" name="Football" id="Football" value='Football'/>
    <br />
    <label htmlFor="Basketball">Basketball</label>
    <input type="checkbox" name="Basketball" id="Basketball" value='Basketball'/>
    <br />
    <label htmlFor="Arts">Arts</label>
    <input type="checkbox" name="Arts" id="Arts" value='Arts'/>
    <br />
    {/* SUBMIT */}
    <input type="submit" name="Submit" id="Submit" value='Enviar'/>
    <br />
  </form>
}
export default Formularido