var theBus = new Vue()

Vue.component('prod-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab" :class="{ activeTab: selTab === tab }" v-for="(tab, index) in tabs"  :key="index" 
            @click="selTab = tab" 
           >
            {{tab}}
            </span>

            <div v-show="selTab === 'Reviews'">
                <h2>Reviews</h2>
            
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                    {{review}}
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>

            <div v-show="selTab === 'Submit a Review'">
                <h2>Make a Review</h2>
            
                 <prod-review></prod-review>
            </div>

        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Submit a Review'],
            selTab: 'Reviews'
        }
    }
})

Vue.component('prod-review',
    {
        template: `
            <form class="review-form" @submit.prevent="onSubmit">
              <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name" required>
              </p>
              
              <p>
                <label for="review">Review:</label>      
                <textarea id="review" v-model="review" required></textarea>
              </p>
              
              <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating" required>
                  <option>5</option>
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
                </select>
              </p>

              <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
              </p>
                  
              <p>
                <input type="submit" value="Submit">  
              </p>    
            
            </form>

            
    `,
        data() {
            return {
                name: 'What is your name',
                review: null,
                rating: null,
                errors: []
            }
        },
        methods: {
            onSubmit() {
                if ((this.name && this.name !== 'What is your name') && this.review && this.rating) {
                    let productReview = {
                        name: this.name,
                        review: this.review,
                        rating: this.rating
                    }
                    theBus.$emit('review-done', productReview)
                    this.name = 'Next please...'
                    this.review = null
                    this.rating = null
                } else {
                    if(!this.name || this.name === 'What is your name' ) this.errors.push("Name required.")
                    if(!this.review) this.errors.push("Review required.")
                    if(!this.rating) this.errors.push("Rating required.")
                }
            }
        }
    }
);


Vue.component('prod',
    {
        props: {
            prem: {
                type: Boolean,
                required: true
            }
        },
        template: `
            <div class="product">
                <div class="product-image">
                    <img v-bind:src="image" />

                </div>

                <div class="product-info">
                    {{prodTitle}}<br />
                    Description: {{Desc}}
                    <p>{{stock}}</p>
                    <p>You are the tops: {{prem}}</p>

                    <p>Shipping: {{shipping}}</p>

                    <p v-if="stock>10">Lots Of Stock</p>
                    <p v-else-if="stock<=10">Low Stock</p>
                    <p v-else>Sorry sold out.</p>
                    <p v-show="!lots">More on the way.</p>
                    <br />
                    <ul>
                        <li v-for="part in parts">{{part}}</li>
                    </ul>
                    <div v-for="(v, ind) in variants" :key="v.vId" 
                         class="color-box" :style="{backgroundColor: v.vColour}"
                         @mouseover="changeImageByIndex(ind)
                        ">
                    </div>

                    <button v-on:click="addToCart" :disabled="stock === 0"
                            :class="{disabledButton: !lots}"
                            >Add to Cart</button>
                    <button v-on:click="subFromCart">Remove from Cart</button>
                    <button v-on:click="ordered = 0">Reset Cart</button>
                    
                </div>
                <a v-bind:href="clink">The Odyssey EXO Seven Putter</a>
                <p></P>

                <prod-tabs :reviews="reviews"></prod-tabs>
            </div>
        `,
        data() {
            return {
                Brand: 'Surrey Golf',
                Product: 'Putter',
                Desc: 'Odyssey EXO Seven Putter',
                //image: '../Images/putters-1.png',
                selVariant: 0,
                clink: 'https://www.callawaygolf.com/clubs/odyssey-putters/exo/putters-2018-exo-seven.html',
                //stock: 100,
                lots: true,
                parts: ['Grip Rubber', 'Shaft Steel', 'Head Titanium'],
                variants: [
                    { vId: 1, vColour: 'Red', vImage: '../Images/putters-1.png', vStock: 20 },
                    { vId: 2, vColour: 'Black', vImage: '../Images/BlackGrip-1-12185.png', vStock: 20 }
                ],
                reviews:[]
            }
        },
        methods: {
            addToCart: function() {
                //vueApp.ordered += 1;  This sort of works!
                this.$emit('add-to-cart', this.variants[this.selVariant].vId);
            },
            subFromCart: function() {
                if (vueApp.ordered.length > 0)
                    this.$emit('rmv-from-cart', this.variants[this.selVariant].vId);
            },
            changeImage (vImage) {
                this.image = vImage;
            },
            changeImageByIndex (ind) {
                this.selVariant = ind;
                console.log('Index:' + ind);
            }
        },
        computed: {
            prodTitle() {
                return this.Brand + ' - ' + this.Product;
            },
            image() {
                return this.variants[this.selVariant].vImage;
            },
            stock() {
                return this.variants[this.selVariant].vStock;
            },
            shipping() {
                var test = "5.99"
                if (this.prem) {
                    test = "Free";
                }
                return test;
            }
        },
        mounted() {     //runs as soon as loaded
            theBus.$on('review-done', prodR => {
                this.reviews.push(prodR)
            })

        }
    }
)


var vueApp = new Vue({
    el: '#vueDiv',
    data: {
        prem: true,
        ordered: []
    },
    methods: {
        updateCart(id) {
            this.ordered.push(id);
        },
        removeFromCart(id) {
            this.ordered.pop(id);
        }
    }
})