function map(){
    context = myGameArea.context;
    context.strokeStyle = "#010000";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(120, 135);
    context.lineTo(240, 135);
    context.stroke();

    // context.moveTo(240, 135);
    // context.lineTo(240, 270);
    // context.stroke();

    context.moveTo(120, 135);
    context.lineTo(120, 50);
    context.stroke();

    context.moveTo(120, 50);
    context.lineTo(420, 50);
    context.stroke();

    context.moveTo(420, 50);
    context.lineTo(420, 135);
    context.stroke();

    context.moveTo(420, 135);
    context.lineTo(260, 135);
    context.stroke();

    //xxxxxxxxxxxxxxxxxxxxxxx
    context.strokeStyle = "#ff0000";
    context.beginPath();
    context.lineWidth = 3;

    context.moveTo(230,50);
    context.lineTo(230,20);
    context.stroke();

    context.moveTo(230,20);
    context.lineTo(330,20);
    context.stroke();

    context.moveTo(330,20);
    context.lineTo(330,50);
    context.stroke();

    context.moveTo(330,135);
    context.lineTo(330,100);
    context.stroke();

    context.moveTo(330,100);
    context.lineTo(250,100);
    context.stroke();

    context.moveTo(250,100);
    context.lineTo(250,135);
    context.stroke();


}