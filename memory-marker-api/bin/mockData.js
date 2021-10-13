const db = require('../database');
(async function() {
    await db.sequelize.sync({ force: true });
    let recipe = await db.Topic.create({
        name: "Recipe",
        description: "Ingredients and steps to making food"
    });
    let paleo = await db.Topic.create({
        name: "Paleo",
        description: "Foods that do not contain grains, seed oils, legumes, etc."
    });
    let codingTutorial = await db.Topic.create({
        name: "Coding Tutorial",
        description: "Content that teaches a coding concept or tool"
    });
    let javascript = await db.Topic.create({
        name: "JavaScript",
    });
    let java = await db.Topic.create({
        name: "Java",
    });
    let book = await db.Topic.create({
        name: "Book",
    })
    
    
    let mayo = await db.Marker.create({
        title: "Avocado Oil Mayo",
        description: "Mayonnaise that uses avocado oil",
        url: "https://www.wholesomeyum.com/keto-paleo-mayo-recipe-avocado-oil",
    });
    
    mayo.addTopic(recipe.id);
    mayo.addTopic(paleo.id);

    let es6 = await db.Marker.create({
        title: "ES6 and Beyond",
        description: "Book about ES2015+ features",
        url: "https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond",
    });
    
    es6.addTopic(javascript.id);
    es6.addTopic(book.id);

})();

