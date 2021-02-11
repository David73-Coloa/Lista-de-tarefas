import React,{ Component } from 'react'
import './main.css'
import Form from './Form'
import Tarefas from './Tarefas'


export default class Main extends Component {
    state = {
        novaTarefa: '',
        tarefas: [],
        index: -1,
    }

    handleChange = (e) =>  {
        this.setState({
            novaTarefa: e.target.value,
        })


    }

    handleDelete = (e,index) => {
        const { tarefas } = this.state
        const novaTarefas = [...tarefas]
        novaTarefas.splice(index,1)
        this.setState({
            tarefas: [...novaTarefas],

        })
        

    }

    handleEdit = (e,index) => {
        const { tarefas } = this.state
        this.setState({
            index,
            novaTarefa: tarefas[index],

        })
    }



    handleSubmit = (e) => {
        e.preventDefault()
        const { tarefas,index } = this.state
        let {  novaTarefa } = this.state
        novaTarefa = novaTarefa.trim()
        const novasTarefas  = [...tarefas]
        if (tarefas.indexOf(novaTarefa) !==  -1 || novaTarefa.length < 1) return 
        if (index === -1) {
            this.setState({
                tarefas: [...novasTarefas, novaTarefa ],
                novaTarefa: '',
            })
        }else {
            novasTarefas[index] = novaTarefa
            this.setState({
                tarefas: [...novasTarefas],
                novaTarefa: '',
            })
        }
    }

    componentDidMount() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas'))
        if (!tarefas) return
        this.setState({tarefas})

    }


    componentDidUpdate(prevProps, prevState) {
        const { tarefas } = this.state
        if (tarefas === prevState.tarefas) return
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }
    
    render() {
        const {novaTarefa,tarefas} = this.state
        return (
            <div className="main">
                <h1>Lista de tarefas</h1>
                <Form 
                    handleSubmit={this.handleSubmit} 
                    handleChange={this.handleChange} 
                    novaTarefa={novaTarefa}
                />
                <Tarefas
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                    tarefas={tarefas}

                />
            </div>
        )
    }
    

}
