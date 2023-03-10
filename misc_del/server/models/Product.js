const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        product_id: { type: Number, required: true, unique: true},

        // link onsite
        link: { type: String, required: true },

        variant_sku: { type: String },

        product_type: { type: String },


        // description
        body: { type: String, required: true },
        // details
        product_details: { type: String, required: true },
        title: { type: String, required: true },
        size: { type: String },
        brand: { type: String, required: true },
        // link to image
        images: { type: String, required: true },
        is_in_stock: { type: String, required: true },
        type: { type: String },
        ideal_for: { type: String },
        complete_the_look: { type: String },
        // colours
        actual_color: { type: String, required: true },
        dominant_color: { type: String, required: true },
        // How to wash, etc
        care_instructions: { type: String, required: true },
        // Cotton, etc
        dominant_material: { type: String, required: true },

        // onsite price
        variant_price: { type: Number, required: true },
        // Actual price
        variant_compare_at_price: { type: Number, required: true },

        // others
        inventory: { type: String },
        specifications: { type: String },
        FIELD26: { type: String },
        size_fit: { type: String },
    },
    { timestamps: true } // createdAt and UpdatedAt time noted
)

module.exports = mongoose.model("Product", ProductSchema);

// const sx = {
//         "product_id": 9122629,
//         "link": "https://www.myntra.com/kurta-sets/bownbee/bownbee-boys-brown--off-white-printed-kurta-with-pyjamas/9122629/buy",
//         "size": "2-3Y",
//         "variant_sku": "9122629_2-3Y",
//         "brand": "BownBee",
//         "care_instructions": "Top fabric: Pure Cotton | Bottom fabric: Pure Cotton | Dry-clean",
//         "dominant_material": "Cotton",
//         "title": "BownBee Boys Brown & Off-White Printed Kurta with Pyjamas",
//         "actual_color": "Brown",
//         "dominant_color": "Brown",
//         "product_type": "Kurta with Pyjamas",
//         "images": "http://assets.myntassets.com/v1/assets/images/9122629/2019/4/9/c78a5b9b-c8db-4681-9864-6abb9051ef2b1554795168941-BownBee-Boys-Brown--Off-White-Printed-Kurta-with-Pyjamas-830-1.jpg",
//         "body": "Brown and off-white printed kurta with pyjamasBrown printed straight knee length kurta, has a mandarin collar, long sleeves, straight hem, side slitsOff-white Solid pyjamas, has elasticated waistband, drawstring closure\nThis ethnic piece is perfect for when you take your little boy . Team this set with mojaris for a complete look.\nTop fabric: Pure Cotton Bottom fabric: Pure Cotton Dry-clean",
//         "product_details": "Brown and off-white printed kurta with pyjamasBrown printed straight knee length kurta, has a mandarin collar, long sleeves, straight hem, side slitsOff-white Solid pyjamas, has elasticated waistband, drawstring closure",
//         "size_fit": "",
//         "complete_the_look": "This ethnic piece is perfect for when you take your little boy . Team this set with mojaris for a complete look.",
//         "type": "Clothing/Boys/Kurta Sets/BownBee/More by BownBee",
//         "variant_price": 559,
//         "variant_compare_at_price": 1599,
//         "ideal_for": "Boys",
//         "is_in_stock": "In Stock",
//         "inventory": "Occasion : Daily | Number of Components : 2 | Top Pattern : Printed | Top Design Styling : Regular | Bottom Type : Pyjamas | Top Fabric : Pure Cotton | Dupatta : Without Dupatta | Weave Pattern : Regular | Top Type : Kurta | Wash Care : Dry Clean | Weave Type : Machine Weave | Bottom Fabric : Pure Cotton | Top Hemline : Straight | Pattern Coverage : Small | Sleeve Styling : Regular Sleeves | Waistband : Elasticated | Print or Pattern Type : Ethnic Motifs | Bottom Pattern : Solid | Top Length : Knee Length | Neck : Mandarin Collar | Bottom Closure : Drawstring | Body or Garment Size : Garment Measurements in | Sleeve Length : Long Sleeves | Stitch : Ready to Wear | Top Shape : Straight | Slit Detail : Side Slits",
//         "specifications": "",
//         "FIELD26": ""
// }