Vue.component('prod-review', {
    template: `
        <input v-model="name"></input>
    `,
    data() {
        return {
            name: null
        }
    }
}
)


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
                <prod-review></prod-review>
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
                ]
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