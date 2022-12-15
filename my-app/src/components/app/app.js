import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list'
import EmployerAddForm from '../employers-add-form/employers-add-form';



import './app.css';


class App extends Component {
    constructor (props){
        super(props);
        this.state = {
             data : [
                {name: "John Smith", salary: 600, increase: true, rise: true, id: 1},
                {name:  "Taya Karpenko", salary: 850, increase: false, rise: false, id: 2},
                {name:"Anastasia Zhuk", salary: 1000, increase: true, rise: false, id: 3},
            ],
            term: '',
            filter: 'all'
        }
        this.maxId =  4;
       
    }
    
   deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(element => element.id === id);
            
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const newArr = [... before, ...after];
            
            return {
                data: data.filter(item => item.id !== id)
            }
        }) 
   }   
   addItem = (name, salary) => {
    
        const newItem = {
        name,
        salary,
        increase: false,
        rise: false,
        id: this.maxId++
    }
    this.setState(({data}) => {
        let newArr = [...data, newItem]
        return {
            data: newArr
        }
    })
    
   }  

   onToggleProp = (id, prop) => {

    this.setState(({data}) => ({
       data: data.map( item => {
        if( item.id == id){
            return {...item, [prop]: !item[prop]}
        }
        return item;
       })
    }))
   }

   searchEmp = (items, term) => {
     if(term.lenth === 0) {
        return items;
     }
     return items.filter(item => {
        return item.name.indexOf(term) > -1 ;
     })

   }

   onUpdateSearch = (term) => {
        this.setState({term: term});
   }
   
   filterPost = (items, filter) => {
        switch (filter) {
            case 'rise': 
                return items.filter(item => item.rise);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default : return items;
        }
   }

   onFilterSelect = (filter) => {
        this.setState({filter});
   }
   
   render () {
    const{data, term, filter} = this.state;
    const emploees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);
    return (
        <div className="app">
            <AppInfo emploees={emploees} increased={increased}/>

            <div className="search-panel">
                <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
            </div>
            <EmployersList 
            data = {visibleData}
            onDelete = {this.deleteItem}
            onToggleProp = {this.onToggleProp}
            />
            <EmployerAddForm onAdd={this.addItem}/>
        </div>
    )
   }
}
export default App;