const Victor = window.Victor
const app = new PIXI.Application(
  window.innerWidth, window.innerHeight,
  {backgroundColor : 0x002b61}
);
document.body.appendChild(app.view);
const container = new PIXI.Container();
const interactionManager = new PIXI.interaction.InteractionManager(
  app.renderer,
  {
    autoPreventDefault: true
  }
);
app.stage.addChild(container);
const hero = PIXI.Sprite.fromImage('hero.png')
hero.anchor.set(0.5);
hero.x = app.renderer.width / 4;
hero.y = app.renderer.height / 2;
container.addChild(hero);
const bow = PIXI.Sprite.fromImage('bow.png')
bow.anchor.set(0.5);
bow.x = hero.x + 80;
bow.y = hero.y;
container.addChild(bow);
let arrows = []
interactionManager.on('pointerdown', () => {
let arrow = PIXI.Sprite.fromImage('arrow.png')
arrow.anchor.set(0.5);
arrow.x = bow.x
arrow.y = bow.y
arrow.rotation = bow.rotation
container.addChild(arrow);
const mousePos = interactionManager.mouse.global
arrow.target = new Victor(mousePos.x - bow.x, mousePos.y - bow.y);
arrows.push(arrow)
  window.setTimeout(() => {
    container.removeChild(arrow)
    arrows.filter(a => a !== arrow)
  }, 5000)
});
app.ticker.add(function(delta) {
  const mousePos = interactionManager.mouse.global
  const mouseVec = new Victor(mousePos.x - bow.x, mousePos.y - bow.y);
  bow.rotation = mouseVec.horizontalAngle()
  arrows.forEach(arrow => {
    const targetVec = arrow.target.normalize().multiply(
      new Victor(delta * 10, delta * 10)
    )
    let arrowVector = new Victor(arrow.x, arrow.y);
  let newVector = arrowVector.add(targetVec)
  arrow.x = newVector.x
  arrow.y = newVector.y
})
});