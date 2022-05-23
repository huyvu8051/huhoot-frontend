
var colors = [
    "#FF0000",
    "#0179B4",
    "#FFAA0D",
    "#12952E",
    "#FE670A",
    "#74007E",
]

var getColor = (index, isCorrect, isSelected) => {
    if (index < 0 || index > colors.length - 1)
        return "#ffffff";


    var opacity;
    if (isCorrect || isCorrect == null || isCorrect == undefined) {
        opacity = 1;
    } else {
        opacity = 0.2;
    }
    var scale;
    var rotate;
    if (!isSelected || isSelected == null || isSelected == undefined) {
        scale = 1;
        rotate = '0deg'
    } else {
        scale = 0.8;
        rotate = '20deg'
    }

    //  console.log(isSelected,scale);

    var result = {
        'background-color': colors.at(index),
        'opacity': opacity,
        'transform': 'scale(' + scale + ') rotateX(' + rotate + ')'
    }
    return result;
}


var bindStyleForComponent = (answers) => {
    return answers.map((item, index) => {
        if (!item.isCorrect) {
            item.isCorrect = true;
        }

        if (!item.selected) {
            item.selected = false;
        }

        item.style = getColor(index, item.isCorrect, item.selected);
        return item;
    })
}

export default {
    getColor,
    bindStyleForComponent
}