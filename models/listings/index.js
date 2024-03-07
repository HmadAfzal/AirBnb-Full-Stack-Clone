const mongoose = require('mongoose');
const Review = require('../review/review');


const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
       url:String,
       filename:String
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
   geometry: {
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }

})

listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.review } });
    }
})

const Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing;


    
  
//   let initdb = async () => {
//     try {
//         const initdata = [
//             {
//                 title: "Cozy Beachfront Cottage",
//                 description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
//                 image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//                 price: 1500,
//                 location: "Malibu",
//                 country: "United States",
//             },
//             {
//                 title: "Cozy Beachfront Cottage",
//                 description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
//                 image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//                 price: 1500,
//                 location: "Malibu",
//                 country: "United States",
//               },
//               {
//                 title: "Modern Loft in Downtown",
//                 description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
//                 image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//                 price: 1200,
//                 location: "New York City",
//                 country: "United States",
//               },
//               {
//                 title: "Mountain Retreat",
//                 description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
//                 image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 1000,
//                 location: "Aspen",
//                 country: "United States",
//               },
//               {
//                 title: "Historic Villa in Tuscany",
//                 description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
//                 image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 2500,
//                 location: "Florence",
//                 country: "Italy",
//               },
//               {
//                 title: "Secluded Treehouse Getaway",
//                 description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
//                 image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//                 price: 800,
//                 location: "Portland",
//                 country: "United States",
//               },
//               {
//                 title: "Beachfront Paradise",
//                 description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
//                 image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//                 price: 2000,
//                 location: "Cancun",
//                 country: "Mexico",
//               },
//               {
//                 title: "Rustic Cabin by the Lake",
//                 description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
//                 image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 900,
//                 location: "Lake Tahoe",
//                 country: "United States",
//               },
//               {
//                 title: "Luxury Penthouse with City Views",
//                 description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
//                 image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=800&q=60",
//                 price: 3500,
//                 location: "Los Angeles",
//                 country: "United States",
//               },
//               {
//                 title: "Ski-In/Ski-Out Chalet",
//                 description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
//                 image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 3000,
//                 location: "Verbier",
//                 country: "Switzerland",
//               },
//               {
//                 title: "Safari Lodge in the Serengeti",
//                 description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
//                 image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 4000,
//                 location: "Serengeti National Park",
//                 country: "Tanzania",
//               },
//               {
//                 title: "Historic Canal House",
//                 description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
//                 image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//                 price: 1800,
//                 location: "Amsterdam",
//                 country: "Netherlands",
//               },
//               {
//                 title: "Private Island Retreat",
//                 description: "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
//                 image: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
//                 price: 10000,
//                 location: "Fiji",
//                 country: "Fiji",
//               },
//               {
//                 title: "Charming Cottage in the Cotswolds",
//                 description: "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
//                 image: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//                 price: 1200,
//                 location: "Cotswolds",
//                 country: "United Kingdom",
//               },
//               {
//                 title: "Historic Brownstone in Boston",
//                 description: "Step back in time in this elegant historic brownstone located in the heart of Boston.",
//                 image: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 2200,
//                 location: "Boston",
//                 country: "United States",
//               },
//               {
//                 title: "Vineyard Estate in Napa Valley",
//                 description: "Live the wine country lifestyle in this luxurious vineyard estate in the heart of Napa Valley.",
//                 image: "https://images.unsplash.com/photo-1594033065008-2dc30f63c14a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 2800,
//                 location: "Napa Valley",
//                 country: "United States",
//               },
//               {
//                 title: "Tranquil Lakeside Cabin",
//                 description: "Escape the hustle and bustle in this peaceful lakeside cabin surrounded by towering pine trees.",
//                 image: "https://images.unsplash.com/photo-1601855018522-e44d5854ff8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFrZXNpZGUlMjBjYWJpbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60",
//                 price: 950,
//                 location: "Lake Placid",
//                 country: "United States",
//               },
//               {
//                 title: "Modern Urban Apartment",
//                 description: "Live in style in this sleek and modern apartment located in the vibrant downtown area.",
//                 image: "https://images.unsplash.com/photo-1532354050577-6a33848c5b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 1800,
//                 location: "Chicago",
//                 country: "United States",
//               },
//               {
//                 title: "Seaside Villa in Santorini",
//                 description: "Experience the magic of Santorini from this stunning seaside villa with panoramic views of the Aegean Sea.",
//                 image: "https://images.unsplash.com/photo-1605876087563-81061b321c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FudG9yaW5pfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 3000,
//                 location: "Santorini",
//                 country: "Greece",
//               },
//               {
//                 title: "Eco-Friendly Retreat in Costa Rica",
//                 description: "Immerse yourself in nature at this eco-friendly retreat nestled in the lush rainforests of Costa Rica.",
//                 image: "https://images.unsplash.com/photo-1532778248071-ed20f1e47327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNvc3RhJTIwc2VyaWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 1200,
//                 location: "Monteverde",
//                 country: "Costa Rica",
//               },
//               {
//                 title: "Scenic Mountain Chalet",
//                 description: "Wake up to breathtaking mountain views from this cozy chalet nestled in the Swiss Alps.",
//                 image: "https://images.unsplash.com/photo-1528375346495-0ea912efd576?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW58ZW58MHx8MHx8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 2000,
//                 location: "Interlaken",
//                 country: "Switzerland",
//               },
//               {
//                 title: "Remote Desert Oasis",
//                 description: "Escape to this remote desert oasis for a tranquil retreat under the starry night sky.",
//                 image: "https://images.unsplash.com/photo-1543866174-3d1d944e0ea0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRlc2VydCUyMG9waW5pb25zfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 800,
//                 location: "Sahara Desert",
//                 country: "Morocco",
//               },
//               {
//                 title: "Mountain View Cabin",
//                 description: "Relax on the porch and enjoy stunning mountain views from this charming cabin in the Rockies.",
//                 image: "https://images.unsplash.com/photo-1549880184-6eb3b207b9d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 1000,
//                 location: "Banff",
//                 country: "Canada",
//               },
//               {
//                 title: "Secluded Island Bungalow",
//                 description: "Escape the crowds and unwind in this secluded island bungalow surrounded by turquoise waters.",
//                 image: "https://images.unsplash.com/photo-1618481843506-aa4094735a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWxhbnN0ZXJyYXRpbmclMjBib3RoZW1hY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
//                 price: 2500,
//                 location: "Bora Bora",
//                 country: "French Polynesia",
//               },
//               {
//                 title: "Historic Castle in Scotland",
//                 description: "Live like royalty in this majestic historic castle set amidst the breathtaking Scottish Highlands.",
//                 image: "https://images.unsplash.com/photo-1561084467-c1fd00267a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGNhc3RsZSUyMGhpbGRyYWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 3500,
//                 location: "Scottish Highlands",
//                 country: "United Kingdom",
//               },
//               {
//                 title: "Luxury Villa in Bali",
//                 description: "Experience the epitome of luxury in this exquisite villa with a private infinity pool overlooking the ocean.",
//                 image: "https://images.unsplash.com/photo-1581535469995-57ca84ec9d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFsaSUyMGxhbHklMjB2aWxsYXxlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60",
//                 price: 4500,
//                 location: "Bali",
//                 country: "Indonesia",
//               },
//               {
//                 title: "Modern Desert Retreat",
//                 description: "Relax in style at this modern desert retreat with sleek design and breathtaking views of the Joshua Tree landscape.",
//                 image: "https://images.unsplash.com/photo-1606508149872-29e48bb5b86d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVzZXJ0JTIwcmV0cmVhdHxlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60",
//                 price: 1500,
//                 location: "Joshua Tree",
//                 country: "United States",
//               },
//               {
//                 title: "Ski Lodge in Whistler",
//                 description: "Hit the slopes from this cozy ski lodge located in the world-renowned Whistler Blackcomb ski resort.",
//                 image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2tpJTIwbG9kZ2V8ZW58MHx8MHx8fHww&auto=format&fit=crop&w=800&q=60",
//                 price: 2800,
//                 location: "Whistler",
//                 country: "Canada",
//               },
//               {
//                 title: "Oceanfront Villa in the Algarve",
//                 description: "Wake up to the sound of the waves crashing in this stunning oceanfront villa in Portugal's Algarve region.",
//                 image: "https://images.unsplash.com/photo-1580772777196-585bfae1a0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2NlYW5mcm9tJTIwdmlsbGF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
//                 price: 2000,
//                 location: "Algarve",
//                 country: "Portugal",
//               },
//               {
//                 title: "Luxury Safari Tent in Kenya",
//                 description: "Experience the thrill of the safari in luxury with a stay in this elegant safari tent in the heart of Kenya.",
//                 image: "https://images.unsplash.com/photo-1599405540256-9e16bd1d68e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpJTIwdGVudHxlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60",
//                 price: 3500,
//                 location: "Maasai Mara",
//                 country: "Kenya",
//               }
           
//         ];

//         await Listing.deleteMany({});
//         const newData = initdata.map(obj => ({ ...obj, owner: "65e6243d8069268abaaeff5c" }));
//         await Listing.insertMany(newData);
//         console.log("Data reinitialized");
//     } catch (error) {
//         console.error("Error reinitializing data:", error);
//     }
// };

// initdb();

