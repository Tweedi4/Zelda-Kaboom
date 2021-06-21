kaboom ({
    global:true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor:[0,0,0,1]
})

loadRoot ('/sprites/')
loadSprite('link-going-left', 'link-going-left.png')
loadSprite('link-going-right', 'link-going-right.png')
loadSprite('link-going-down', 'link-going-down.png')
loadSprite('link-going-up', 'link-going-up.png')
loadSprite('left-wall', 'left-wall.png')
loadSprite('right-wall', 'right-wall.png')
loadSprite('top-wall', 'top-wall.png')
loadSprite('bottom-wall', 'bottom-wall.png')
loadSprite('bottom-left-wall', 'bottom-left-wall.png')
loadSprite('bottom-right-wall', 'bottom-right-wall.png')
loadSprite('top-left-wall', 'top-left-wall.png')
loadSprite('top-right-wall', 'top-right-wall.jpg')
loadSprite ('top-door','top-door.png')
loadSprite ('left-door','left-door.png')
loadSprite ('fire-pot','fire-pot.png')
loadSprite ('lanterns','lanterns.png')
loadSprite ('slicer','slicer.png')
loadSprite ('skeletor','skeletor.png')
loadSprite ('stairs','stairs.png')
loadSprite ('bg','bg.png')

scene ('game', ({ level, score }) => {
        layers (['bg', 'obj', 'ui'], 'obj')
    
        const map = [
            'ycc)cc^ccw',
            'a        b',
            'a     *  b',
            'a    (   b',
            '%        b',
            'a    (   b',
            'a  *     b',
            'a        b',
            'xdd)dd)ddz',
        ]

        const levelCfg = {
            width: 48,
            height: 48,
            'a': [sprite('left-wall'),solid(), 'wall'],
            'b': [sprite('right-wall'),solid(), 'wall'],
            'c' : [sprite('top-wall'),solid(), 'wall'],
            'd' : [sprite('bottom-wall'),solid(), 'wall'],
            'w' : [sprite('top-right-wall'),solid(), 'wall'],
            'x' : [sprite('bottom-left-wall'),solid(), 'wall'],
            'y' : [sprite('top-left-wall'),solid(), 'wall'],
            'z' : [sprite('bottom-right-wall'),solid(), 'wall'],
            '%' : [sprite('left-door')],
            '^' : [sprite('top-door')],
            '$' : [sprite('stairs')],
            '*' : [sprite('slicer'), 'slicer', 'dangerous', {dir: -1}],
            '}' : [sprite('skeletor'), 'dangerous'],
            ')' : [sprite('lanterns'),solid(), 'wall'],
            '(' : [sprite('fire-pot'),solid()],
        }

        addLevel(map, levelCfg)

        add ([sprite('bg'), layer('bg')])

        const scoreLabel = add ([
            text('0'),
            pos(400,450),
            layer('ui'),
            {
                value: score,
            },
            scale(3)
        ])
        
        const player = add([sprite('link-going-right'),pos(5,190)])

        player.action (() => {
            player.resolve()
        })

        const MOVE_SPEED = 120

        keyDown('left', () => {
            player.changeSprite('link-going-left')
            player.move(-MOVE_SPEED, 0)
        })

        keyDown('right', () => {
            player.changeSprite('link-going-right')
            player.move(MOVE_SPEED, 0)
        })

        keyDown('up', () => {
            player.changeSprite('link-going-up')
            player.move(0, -MOVE_SPEED)
        })

        keyDown('down', () => {
            player.changeSprite('link-going-down')
            player.move(0, MOVE_SPEED)
        })

        const SLICER_SPEED = 120
        action('slicer', (s) => {
            s.move(s.dir * SLICER_SPEED,0)
        })

        collides('slicer','wall', (s) => {
            s.dir = -s.dir
        })

        player.overlaps('dangerous', () => {
            go('lose', { score: scoreLabel.value}) 
        })


})

scene ('lose', ({ score }) => {
    add([text(score, 32), origin('center'), pos(width()/2, height()/2)])
})

start('game',
 {level:0, score: 0 }
)