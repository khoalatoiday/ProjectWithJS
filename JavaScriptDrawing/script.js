/*
    What we learn? To know how to draw by JS
    I2Djs framework: Integrated-2D is an Open source Javascript framework for rendering 2D graphics on SVG, Canvas, and WebGL contexts


    */

    var renderer = i2d.svgLayer('#MYSVG',{}); // create SVG layer
    var parallelChain = i2d.parallelChain().loop(10); // create parallel Chain and number of times chain needs to be excuted
    var circleCount = 100;
    var radius = 100;

    var g = renderer.createEl({ // create element in API
        el: 'group', // type group
        attr: { 
            transform:{ // applies an element into 2d and 3d transformation
                translate: [renderer.width/2, renderer.height/2] // define a 2d translation
            }
        }
    })

    g.createEls((new Array(circleCount)).fill().map(function(d,i){ // create array of element
        return i 
    }),{
        el : 'circle',
        attr : {
            r : 5, // radius = 5
            cx : 0, // coor-x of center = 0
            cy : 0, // coor-y of center =0
        },
        style:{
            fill: function(d){
                return 'hsl(' + ((d % 50) / 50) * 360 + ',70%, 50%)'
            }
        }
    }).exec(animateEachCircle) // at the end of chain execution, animateEachCircle will be called

    function animateEachCircle(d){
        parallelChain.add(this.animateExe({
            duration : 2000,
            delay: (d%50) *30,
            ease: 'easeInOutSin',
            attr: function(f){
                this.setAttr({
                    cx: radius * Math.cos(f * Math.PI * 2 + Math.PI * Math.floor(d / 50)) + (-radius + Math.floor(d / 50) * radius * 2),
                    cy: radius * Math.sin(f * Math.PI * 2 + Math.PI * Math.floor(d / 50))
                })
            }
        }))
    }

    parallelChain.start()