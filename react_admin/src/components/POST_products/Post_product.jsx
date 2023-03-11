import axios from 'axios';
import React from 'react';
import './post_product.css';

class PostProduct extends React.Component 
{
    constructor(props) {
        super(props);

        this.state = {prodArray: [], 
                    image_url_primary: "", 
                    image_url_other1: "", 
                    image_url_other2: "", 
                    image_url_other3: "",
                    productINFO: {
                        product_type: "",
                        details: "",
                        title: "",
                        size: "",
                        brand: "",
                        images: [],
                        is_in_stock: "",
                        type: "",
                        ideal_for: "",
                        
                        color: "",
                        care_instructions: "",
                        material: "",
                        variant_price: "",
                        variant_compare_at_price: "",
                        complete_the_look: ""
                    }
                };

        this.image_not_found = "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png";
        // this.image_not_found = "https://cdn.shopify.com/s/files/1/0088/4031/4931/products/21_02b4dea5-cac7-4adc-bf8a-e235230c252d_1300x.jpg?v=1670332650";
    }

    componentDidMount() {
        this.GET_Products();
    }

    GET_Products() {
    axios.get('http://localhost:5000/api/product')
        .then(response => {
            this.setState({ prodArray: response.data });
        })
        .catch(error => {
            console.log(error);
        });
    }

    POST_Products(data) {
        console.log("in post");
        axios.post('http://localhost:5000/api/product', data)
            .then(response => {
                this.setState({ prodArray: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleDataforPost() {
        // ... get data from state -> make changes -> send the request
        let data = this.state.productINFO;
        for ( const image of [this.state.image_url_primary, this.state.image_url_other1, this.state.image_url_other2, this.state.image_url_other3]) {
            if (image !== "") {
                // ignore the empty images
                data.images.push(image);
            }
        }
        console.log(data);
        const postDATA = {
            "body": data.details,
            "product_details": data.details,
            "title": data.title,
            "size": data.size,
            "brand": data.brand,
            "images": data.images,
            "is_in_stock": data.is_in_stock,
            "type": data.type,
            "ideal_for": data.ideal_for,
            "complete_the_look": data.complete_the_look,
            
            "actual_color": data.color,
            "dominant_color": data.color,
            "care_instructions": data.care_instructions,
            "dominant_material": data.material,
            "variant_price": data.variant_price,
            "variant_compare_at_price": data.variant_compare_at_price,
            "inventory": ""
        }
        console.log(postDATA);
        this.POST_Products(postDATA);
        // FIX THE ONCHANGE FUNCS SHould be productINFO.title, productINFO.etc
    }

    render() {
        return (
            <div id="root-div">
                <div className='main-form'>
                    <div className='form-divs' id='product-title'>
                        <label>Product Image URLs</label>
                        <div className='input-div'>
                            <input type="text" placeholder='product title' autoComplete='off' spellCheck="false" onChange={(val) => {this.setState({productINFO['title']: val.target.value})}}/>
                            <input required type="text" placeholder='product Image URL Primary' autoComplete='off' spellCheck="false" onChange={(url) => {this.setState({image_url_primary: url.target.value})}}/>
                            <input type="text" placeholder='product Image URL Other' autoComplete='off' spellCheck="false" onChange={(url) => {this.setState({image_url_other1: url.target.value})}}/>
                            <input type="text" placeholder='product Image URL Other' autoComplete='off' spellCheck="false" onChange={(url) => {this.setState({image_url_other2: url.target.value})}}/>
                            <input type="text" placeholder='product Image URL Other' autoComplete='off' spellCheck="false" onChange={(url) => {this.setState({image_url_other3: url.target.value})}}/>
                        </div>
                    </div>

                    <div className='form-divs' id='product-price'>
                        <label htmlFor="">Product Price</label>
                        <div className='input-div'>
                            <input type="number" placeholder='variant Price' min={0} onChange={(val) => {this.setState({variant_price: val.target.value})}}/>
                            <input type="number" placeholder='Compared/Actual Price' min={0} onChange={(val) => {this.setState({variant_compare_at_price: val.target.value})}}/>
                        </div>
                    </div>

                    <div className='form-divs' id='product-description'>
                        <label htmlFor="">Product Description/Details</label>
                        <div className='input-div'>
                            <input type="text" placeholder='Brand' autoComplete='off' spellCheck="false" onChange={(val) => {this.setState({brand: val.target.value})}}/>
                            <input type="text" placeholder='Product Description' autoComplete='off' spellCheck="false" onChange={(val) => {this.setState({details: val.target.value})}}/>
                            <input type="text" placeholder='Product Colour' autoComplete='off' spellCheck="false" onChange={(val) => {this.setState({color: val.target.value})}}/>
                            <input type="text" placeholder='Type of Product' autoComplete='off' spellCheck="false" onChange={(val) => {this.setState({type: val.target.value})}}/>
                            <input type="text" placeholder='Product Ideal for? Men, women, boys, girls' autoComplete='off' spellCheck="false" onChange={(val) => {this.setState({ideal_for: val.target.value})}}/>
                            <input type="text" placeholder='Primary Material used in the product, eg: Cotton' autoComplete='off' spellCheck="false" onChange={(val) => {this.setState({material: val.target.value})}}/>
                            <input type="text" placeholder='Care Instructions for the product, eg: dry wash only' autoComplete='off' spellCheck="false" onChange={(val) => {this.setState({care_instructions: val.target.value})}}/>
                        </div>
                    </div>

                    <div className='form-divs' id='dropdown-option'>
                        <label htmlFor="size-select">Select size:</label>
                        <select id="size-select" name="size" onChange={(val) => {this.setState({size: val.target.value})}}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>

                    <div className='form-divs' id='product-tagline'>
                        <div className='input-div'>
                            <input type="text" placeholder='Tagline that may suit the product' autoComplete='off' spellCheck="false" onChange={(val) => {this.setState({complete_the_look: val.target.value})}}/>
                        </div>
                    </div>
                    <div className='form-divs' id='dropdown-option'>
                        <label htmlFor="stock-select">Is in Stock?</label>
                        <select id="stock-select" name="stock" onChange={(val) => {this.setState({is_in_stock: val.target.value})}}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className='form-divs'>
                        <div className='input-div'>
                            <button type='submit' onClick={() => {this.handleDataforPost()}}>Submit</button>
                        </div>
                    </div>
                </div>
                <div id='image-div'>
                    <div className='image-set'>
                        <img id='image_from_url' src={this.state.image_url_primary} alt="from URL" onError={(e) => {e.target.src = this.image_not_found}}/>
                        <img id='image_from_url' src={this.state.image_url_other1} alt="from URL" onError={(e) => {e.target.src = this.image_not_found}}/>
                    </div>

                    <div className='image-set'>
                        <img id='image_from_url' src={this.state.image_url_other2} alt="from URL" onError={(e) => {e.target.src = this.image_not_found}}/>
                        <img id='image_from_url' src={this.state.image_url_other3} alt="from URL" onError={(e) => {e.target.src = this.image_not_found}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostProduct;

// {"_id":"63d410ebf04180823d5964ca",
// "title":"Nike t-shirt",
// "description":"test-Description",
// "image":"test-Image",
// "category":["t-shirt","man"],
// "size":"L","colour":"Red","price":30,
// "createdAt":"2023-01-27T17:59:07.825Z",
// "updatedAt":"2023-01-27T17:59:07.825Z","__v":0}