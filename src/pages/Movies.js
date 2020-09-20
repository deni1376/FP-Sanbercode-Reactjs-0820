import React, {useState, useEffect} from "react"
import axios from "axios"
import "./Movies.css"

const Game = () => {
  
  const [game, setGame] =  useState(null)
  const [input, setInput]  =  useState({
    created_at: Date,
    updated_at: Date,
    name: "",
    genre: "",
    singlePlayer:Boolean,
    multiPlayer:Boolean,
    platform:"",
    release: 2020,
    image_url:""
  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const [search, setSearch] = useState("")

  useEffect( () => {
    if (game === null){
      axios.get(`https://backendexample.sanbersy.com/api/data-game`)
      .then(res => {
          setGame(res.data.map(el=>{ return {
            idGame: el.id, 
            created_at: el.created_at, 
            updated_at: el.updated_at,
            name:el.name,
            genre: el.genre,
            singlePlayer:el.singlePlayer,
            multiPlayer:el.multiPlayer,
            platform:el.platform,
            release: el.release,
            image_url: el.image_url,
          }
        }))
      })
    }
  }, [game])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "created_at":
      {
        setInput({...input, created_at: event.target.value});
        break
      }
      case "updated_at":
      {
        setInput({...input, updated_at: event.target.value});
        break
      }
      case "name":
      {
        setInput({...input, name: event.target.value});
          break
      }
      case "genre":
        {
          setInput({...input, genre: event.target.value});
            break
        }
      case "singlePlayer":
        {
          setInput({...input, singlePlayer: event.target.value});
            break
        }
        case "multiPlayer":
      {
        setInput({...input, multiPlayer: event.target.value});
          break
      }
        case "platform":
      {
        setInput({...input, platform: event.target.value});
          break
      }
        case "release":
      {
        setInput({...input, release: event.target.value});
          break
      }
      case "image_url":
        {
          setInput({...input, image_url: event.target.value});
            break
        }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let name = input.name
    console.log(input)

    if (name.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://backendexample.sanbersy.com/api/data-game`, {
          created_at:input.created_at,
          updated_at: input.updated_at,
          name:input.name,
          singlePlayer:input.singlePlayer,
          multiPlayer:input.multiPlayer,
          platform:input.platform,
          release: input.release,
        })
        .then(res => {
            setGame([...Game, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://backendexample.sanbersy.com/api/data-game/{ID_GAMES}`, {
          created_at:input.created_at,
          updated_at:input.updated_at,
          name:input.name,
          singlePlayer:input.singlePlayer,
          multiPlayer:input.multiPlayer,
          platform:input.platform,
          release: input.release,
        .then(res => {
            let singleGame = game.find(el=> el.id === selectedId)
            singleGame.created_at = input.created_at
            singleGame.update_at = input.updated_at
            singleGame.year = input.year
            singleGame.duration = input.duration
            singleGame.genre = input.genre
            singleGame.rating = input.rating
            setGame([...game])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        created_at: Date,
        updated_at: Date,
        name: "",
        genre: "",
        singlePlayer:Boolean,
        multiPlayer:Boolean,
        platform:"",
        release: 2020,
        image_url:""
      })
    }

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newGame = game.filter(el => el.id != itemId)
  
      axios.delete(`https://backendexample.sanbersy.com/api/data-game/{ID_GAMES}`)
      .then(res => {
        console.log(res)
      })
            
      setGame([...newGame])
      
    }
    
    const handleEdit = () =>{
      let singleGame = Game.find(x=> x.id === itemId)
      setInput({
        created_at: singleGame.created_at,
        updated_at: singleGame.updated_at,
        name:singleGame.name,
        genre: singleGame.genre,
        singlePlayer:singleGame.singlePlayer,
        multiPlayer:singleGame.multiPlayer,
        platform:singleGame.platform,
        release: singleGame.release,
        image_url: singleGame.image_url,
      })
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <>
        <button onClick={handleEdit}>Edit</button>
        &nbsp;
        <button onClick={handleDelete}>Delete</button>
      </>
    )
  }

  function truncateString(str, num) {
    if (str === null){
      return ""
    }else{
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
  

  const submitSearch = (e) =>{
    e.preventDefault()
    axios.get(`https://backendexample.sanbersy.com/api/data-game`)
    .then(res => {
      let resMovies = res.data.map(el=>{ return {
          id: el.id, 
          created_at: el.created_at,
          updated_at: el.update_at,
          name:el.name,
          genre: el.genre,
          singlePlayer:el.singlePlayer,
          multiPlayer:el.multiPlayer,
          platform:el.platform,
          release:el.release,
          image_url: el.image_url
        }
      })

      let filteredMovies = resMovies.filter(x=> x.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      setMovies([...filteredMovies])
    })
 
  }

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

  return(
    <>
      <div>
        <form onSubmit={submitSearch}>
          <input type="text" value={search} onChange={handleChangeSearch} />
          <button>search</button>
        </form>
      </div>

      <h1>Daftar Game</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Created_at</th>
            <th>Updated_at</th>
            <th>Name</th>
            <th>Genre</th>
            <th>SinglePlayer</th>
            <th>MultiPlayer</th>
            <th>Platform</th>
            <th>Release</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

            {
              movies !== null && movies.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td title={item.description}>{truncateString(item.description, 20)}</td>
                    <td>{item.year}</td>
                    <td>{item.duration}</td>
                    <td>{item.genre}</td>
                    <td>{item.rating}</td>
                    <td>
                      <Action itemId={item.id} />

                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {/* Form */}
      <h1>Movies Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{float: "left"}}>
            Title:
          </label>
          <input style={{float: "right"}} type="text" name="title" value={input.title} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{float: "left"}}>
            Description:
          </label>
          <textarea style={{float: "right"}} type="text" name="description" value={input.description} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Year:
          </label>
          <input style={{float: "right"}} type="number" max={2020} min={1980}  name="year" value={input.year} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Duration:
          </label>
          <input style={{float: "right"}} type="number" name="duration" value={input.duration} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Genre:
          </label>
          <input style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Rating:
          </label>
          <input style={{float: "right"}} type="number" max={10} min={0} name="rating" value={input.rating} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Image Url:
          </label>
          <textarea style={{float: "right"}} cols="50" rows="3" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <br/>
        <br/>
        <button>submit</button>
      </form>
    </>
  )
}

export default Game