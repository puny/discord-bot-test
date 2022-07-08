

['canvas', 'button', 'commands'].forEach(value => {
    require(`./${value}.js`);
})

console.log(canvas.hello);