import React,{Component} from "react"
import Axios from "axios"
import { observable } from "mobx";
class Store extends Component{
    @observable inputValue="成功";
    @observable list=["45","46"];
}
var store=new Store();
export default store;
