import axios from 'axios'
import React,{useState, useEffect} from 'react'
import Select from 'react-select'
import { ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const optionsProduct = [
    {
        label:"Product1",
        value: "product1",
    },
    {
        label:"Product2",
        value: "product2",
    },
    {
        label:"Product3",
        value: "product3",
    },
    {
        label:"Product4",
        value: "product4",
    },
    {
        label:"Product5",
        value: "product5",
    },
    {
        label:"Product6",
        value: "product6",
    },
    {
        label:"Product7",
        value: "product7",
    }
]

const optionsSize = [
    {
        label:"XL",
        value: "xl",
    },
    {
        label: "L",
        value:"l",
    },
    {
        label:"M",
        value: "m",
    }
]
const Selectable = () => {
    
    let  size = []
    const [sizeValues, setSizeValues] = useState([])
    const [productName, setProductName] = useState('')
    const [productInfo, setProductInfo] = useState([])
    const [show, setShow] = useState()

    useEffect(() =>{
        axios.get('http://localhost:3001/products/').then(res =>{
            setProductInfo(res.data)
        })
    },[])

    const selectedSize = (e) =>{
        console.log(e)
        size.length = 0
        e.map(item =>{
            size.push(item.value)
        })
        setSizeValues(size)

    } 

    console.log(sizeValues, "admcsjndvkjd")

    const selectedName = (e) =>{
        console.log(e)
        setProductName(e.value)
    }

    console.log(productName, "product name")

    const handleClick = () =>{
        console.log(productName.length === 0 && sizeValues.length === 0,"cdsdvefb sfbnsfbjad")

        if((productName.length === 0)){
            toast.error("Please select both value")
        }else if(sizeValues.length === 0){
            toast.error("Please select both value")  
        }
        else{
            axios.post("http://localhost:3001/products/",{
            id: Math.floor(Math.random() * 1000),
            productnName: productName,
            size: sizeValues
        }).then(res =>{
            console.log("data added successfully")
            axios.get("http://localhost:3001/products/").then(res =>{
                setProductInfo(res.data)
            })
        })
        }
        
    }

    console.log(productInfo)

    const onDeleteHandler = (id) =>{
        axios.delete(`http://localhost:3001/products/${id}`).then(res =>{
            axios.get('http://localhost:3001/products/').then(res =>{
                setProductInfo(res.data)
            })
        })
    }

   
    
    // console.log(size,"size state")
  return (

    <div>
       
       
        
       
        
        

        <table className='table'>
            <thead>
                <tr>
                    <td>
                    <Select options={optionsProduct} className="select-field" onChange={e => selectedName(e)}  />
                    </td>
                    <td>
                    <Select options={optionsSize} className="select-field" isMulti onChange={(e) => selectedSize(e)} />
                    </td>
                    <td>
                    <button className='btn btn-primary' onClick={handleClick}>Add</button>
                    </td>
                </tr>

                <tr>
                    <th hidden={true}>ID</th>
                    <th>Productname</th>
                    <th>Size</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                    {
                        productInfo.map(item =>{
                            return(
                                <tr>
                                    <td hidden={true}>{item.id}</td>
                                    <td>{item.productnName}</td>
                                    <td>{item.size.join(', ')}</td>
                                    <td><button className='btn btn-danger' onClick={() => onDeleteHandler(item.id)}>Delete</button></td>
                                </tr>
                            )
                        }
                        )
                    }
                
            </tbody>
        </table>

        <ToastContainer />
    </div>
  )
}

export default Selectable