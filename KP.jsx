/*
Deividas Dambrauskas MKDf-20/2
Adobe After Effects 2020
For ir while loops, function()
 */

app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
app.newProject();

//Pradiniai duomenys
var compW = 1920;
var compH = 1080;
var compAR = 1;
var compD = null;
var compFPS = 25;
var compName = null;

//Prompt projekto pavadinimo ivestis ir patikra
while(compName == null){
    compName = prompt("Enter the name of your composition", "LogoPC2");
    if(compName.length < 1){
        alert("Please enter a name for your composition");
        compName = null;
    }
}

//Prompt projekto trukmes ivestis ir patikra
while((compD == null) || (isNaN(compD)) || (compD < 3.0) || (compD > 15.0)){
    compD = prompt("Enter the duration of your composition", 5.0);
    if((compD == null) || (isNaN(compD)) || (compD < 3.0) || (compD > 15.0)){
        alert("Please enter a number between 3 and 15");
        compD = null;
    }
}

//Konvertavimas i integer
var duration = parseInt (compD);
var durationComp = duration + 3; //Pridedamos papildomos 3 sekundes animacijai paziureti
//Kompoziciju sukurimas
var myComp = app.project.items.addComp(compName, compW, compH, compAR, (durationComp), compFPS);
myComp.openInViewer();

var compLetters = "LettersLogo";
var lettersLogoComp = app.project.items.addComp(compLetters, compW, compH, compAR, (durationComp), compFPS);
var compReveal = "LogoReveal";
var revealLogoComp = app.project.items.addComp(compReveal, compW, compH, compAR, (durationComp), compFPS);
var compScan = "LogoScan";
var scanLogoComp = app.project.items.addComp(compScan, compW, compH, compAR, (durationComp), compFPS);
var compPixel = "PixelLogo";
var pixelLogoComp = app.project.items.addComp(compPixel, compW, compH, compAR, (durationComp), compFPS);

//Adobe Illustrator vektoriniu objektu duomenys
var coordsL = [[772, 526], [730, 563.800048828125], [730, 360], [800, 360], [930, 505], [800, 620], [780.219970703125, 620], [818, 586]];
var coordsR = [[1042, 454], [999.999938964844, 416.200012207031], [999.999938964844, 620], [1070, 620], [1200, 475], [1070, 360], [1050.21997070313, 360], [1088, 394]];
var coordsScreenBot = [[800, 850], [1120, 850]];
var coordsScreenL = [[880, 850], [880, 760]];
var coordsScreenR = [[1040, 760], [1040, 850]];
var coordsScreen = [[1345, 220], [575, 220], [560, 235], [560, 745], [575, 760], [880, 760], [1345, 760], [1360, 745], [1360, 235], [1345, 220]];
var coordsBG = [[2688, -3168], [-3600, 3472]];
var inTangL = [[0, 0], [0, 0], [0, 0], [0, 0], [9.27996826171875, -78.8499755859375], [65.8599853515625, 0], [0, 0], [0, 0]];
var inTangR = [[0, 0], [0, 0], [0, 0], [0, 0], [9.2799072265625, 78.8500366210938], [65.8599853515625, 0], [0, 0], [0, 0]];
var inTangScreenBot = [[0, 0], [0, 0]];
var inTangScreenL = [[0, 0], [0, 0]];
var inTangScreenR = [[0, 0], [0, 0]];
var inTangScreen = [[8.283935546875, 0], [0, 0], [0, -8.28399658203125], [0, 0], [-8.2840576171875, 0], [0, 0], [0, 0], [0, 8.28399658203125], [0, 0], [8.283935546875, 0]];
var inTangBG = [[0, 0], [1572.03369140625, -1662.966796875]];
var outTangL = [[0, 0], [0, 0], [0, 0], [76.989990234375, 0], [-7.70001220703125, 65.4100341796875], [0, 0], [0, 0], [0, 0]];
var outTangR = [[0, 0], [0, 0], [0, 0], [76.989990234375, 0], [-7.7000732421875, -65.4099731445313], [0, 0], [0, 0], [0, 0]];
var outTangScreenBot = [[0, 0], [0, 0]];
var outTangScreenL = [[0, 0], [0, 0]];
var outTangScreenR = [[0, 0], [0, 0]];
var outTangScreen = [[0, 0], [-8.2840576171875, 0], [0, 0], [0, 8.28399658203125], [0, 0], [0, 0], [8.283935546875, 0], [0, 0], [0, -8.28399658203125], [0, 0]];
var outTangBG = [[-1571.98876953125, 1659.01098632813], [0, 0]];

//Sluoksniu pavadinimai
var shapeNameDL = "D_Left Outlines";
var shapeNameDR = "D_Right Outlines";
var shapeScreenBot = "PC_Bottom Outlines EXP";
var shapeScreenL = "PC_LegLeft Outlines EXP";
var shapeScreenR = "PC_LegRight Outlines EXP";
var shapeScreen = "PC_Screen Outlines EXP";
var shapeBG = "Background_Anim EXP";

//Funkcija skirta piesti figuras
function drawShape(Comp, coords, inTang, outTang, color, strokeWidth, lineCap, lineJoin, miterLimit, shapeName){
    //Figuru koordinaciu transformacijos
    var elementCount = coords.length;  
        for(i=0; i<elementCount; i++)
        {
            for(j=0; j<2; j++)
            {
                if(j==0)
                {
                    coords[i][j] += -960;
                }
                else
                {
                    coords[i][j] +=-540;
                }
            }
        }

    //Figurai kuriamas path su vektoriniu objektu duomenimis bei stroke
    var shapeLines = Comp.layers.addShape();
    shapeLines.name = shapeName;
    var shapeContent = shapeLines.property("Contents").addProperty("ADBE Vector Shape - Group");
    var shapeMask = shapeContent.property("Path");
    var shapeMaskVal = shapeMask.value;
    shapeMaskVal.vertices = coords;
    shapeMaskVal.inTangents = inTang;
    shapeMaskVal.outTangents = outTang;
    shapeMask.setValue(shapeMaskVal);
    var shapeStroke = shapeLines.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
    shapeStroke.property("Color").setValue(color);
    shapeStroke.property("Stroke Width").setValue(strokeWidth);
    shapeStroke.property("Opacity").setValue(100);
    shapeStroke.property("Line Cap").setValue(lineCap);
    shapeStroke.property("Line Join").setValue(lineJoin);
    shapeStroke.property("Miter Limit").setValue(miterLimit);
}

//Kuriamas kontroleris su atitinkamais EXPC
var controllerLayer = myComp.layers.addNull();
controllerLayer.source.name = ("Controller");

//Animacijos laiko kontroleris
var sliderAnimD = controllerLayer.property("Effects").addProperty("ADBE Slider Control");
var sliderAnimDName = sliderAnimD.name = ("Animation Duration");
controllerLayer.effect(sliderAnimDName).property("Slider").setValue(duration);
controllerLayer.effect(sliderAnimDName).property("Slider").expression = '''clamp(value, 0.1, 30);''';

//Kompiuterio liniju spalva
var colorPCOutline = controllerLayer.property("Effects").addProperty("ADBE Color Control");
var colorPCOutlineName = colorPCOutline.name = ("PC Outline Color");
controllerLayer.effect(colorPCOutlineName).property("Color").setValue([0, 0, 0]);

//Kompiuterio ekrano spalva
var colorScreen = controllerLayer.property("Effects").addProperty("ADBE Color Control");
var colorScreenName = colorScreen.name = ("Screen Color");
controllerLayer.effect(colorScreenName).property("Color").setValue(([13, 46, 6] / 255));

//Fono animacijos greitis
var sliderBGSpeed = controllerLayer.property("Effects").addProperty("ADBE Slider Control");
var sliderBGSpeed = sliderBGSpeed.name = ("Background Speed");
controllerLayer.effect(sliderBGSpeed).property("Slider").setValue(30);
controllerLayer.effect(sliderBGSpeed).property("Slider").expression = '''clamp(value, 1, 1000);''';

//Sukuriamos abi D raides
drawShape(lettersLogoComp, coordsL, inTangL, outTangL, ([215, 208, 30] / 255), 30, 2, 1, 4, shapeNameDL);
drawShape(lettersLogoComp, coordsR, inTangR, outTangR, ([168, 14, 14] / 255), 30, 2, 1, 4, shapeNameDR);

/*Sukuriamas pradinis transition, kuris atidengia raides
Kuriamas staciakampis su expression'u, kuris keicia pozicija priklausomai nuo laiko*/
var transitionRect = revealLogoComp.layers.addShape();
transitionRect.name = "Mask Rect EXP";
var rect = transitionRect.content.addProperty("ADBE Vector Shape - Rect");
var rectSize = [compW, compH];
rect.property("Size").setValue(rectSize);
rect.property("Position").expression =
'''var t = time;
var tSpeed = comp("LogoPC2").layer("Controller").effect("Animation Duration")("Slider");
var t1 = tSpeed / 17 * 8;
var t2 = tSpeed / 17 * 21;
var p1 = [-1920, 0];
var p2 = [0, 0];

if(t < t1){
    p1;
}
else if(t > t2){
    p2;
}
else{
    linear(t, t1, t2, p1, p2);
}
''';
//Staciakampiui pridedamas fill, efektai ir pakeiciamas sluoksnio track matte
var rectFill = transitionRect.content.addProperty("ADBE Vector Graphic - Fill");
rectFill.property("Color").setValue([1, 1, 1, 1]);
var rectTurbDisp = transitionRect.Effects.addProperty("ADBE Turbulent Displace");
rectTurbDisp.property("Amount").setValue(200);
rectTurbDisp.property("Size").setValue(20);
rectTurbDisp.property("Complexity").setValue(10);
var rectMosaic = transitionRect.Effects.addProperty("ADBE Mosaic");
rectMosaic.property("Horizontal Blocks").setValue(100);
rectMosaic.property("Vertical Blocks").setValue(50);
var revealAdd = revealLogoComp.layers.add(lettersLogoComp);
revealAdd.moveAfter(transitionRect); //sluoksnis perstumiamas del track matte
revealAdd.trackMatteType = TrackMatteType.ALPHA;
revealAdd.trackMatte = transitionRect;

//Sukuriamas pikselinis skanavimo efektas
var whiteTransitionOff = scanLogoComp.layers.add(revealLogoComp);
var whiteTransitionFill2 = whiteTransitionOff.Effects.addProperty("ADBE Fill");
whiteTransitionFill2.property("Color").setValue([1, 1, 1]);
whiteTransitionOff.enabled = false;

var whiteTransitionOn = scanLogoComp.layers.add(revealLogoComp);
var whiteTransitionFill1 = whiteTransitionOn.Effects.addProperty("ADBE Fill");
whiteTransitionFill1.property("Color").setValue([1, 1, 1]);
var whiteTransitionMinimax = whiteTransitionOn.Effects.addProperty("ADBE Minimax");
whiteTransitionMinimax.property("Operation").setValue(1);
whiteTransitionMinimax.property("Radius").setValue(1);
whiteTransitionMinimax.property("Channel").setValue(2);
whiteTransitionOn.moveAfter(whiteTransitionOff); //sluoksnis perstumiamas del track matte
whiteTransitionOff.inPoint = 3 / compFPS;
whiteTransitionOn.trackMatteType = TrackMatteType.ALPHA_INVERTED;
whiteTransitionOn.trackMatte = whiteTransitionOff;

/*Kuriamas galutinis raidziu atidengimo efektas
Sukuriamos atidengtos raides su seselio efektu*/
var logoScanEffects1 = pixelLogoComp.layers.add(revealLogoComp);
var logoScanShadow = logoScanEffects1.Effects.addProperty("ADBE Drop Shadow");
logoScanShadow.property("Opacity").setValue(55 * 2.55);
logoScanShadow.property("Direction").setValue(180);
logoScanShadow.property("Distance").setValue(15);
logoScanShadow.property("Softness").setValue(80);

//Skanavimo efektui uzbaigti uzdedami efektai
var logoScanEffects = pixelLogoComp.layers.add(scanLogoComp);
logoScanEffects.blendingMode = BlendingMode.SCREEN;
var logoScanGlass = logoScanEffects.Effects.addProperty("CC Glass");
logoScanGlass.property("Property").setValue(4);
logoScanGlass.property("Softness").setValue(1);
logoScanGlass.property("Height").setValue(-50);
logoScanGlass.property("Displacement").setValue(200);
var logoScanDisp1 = logoScanEffects.Effects.addProperty("ADBE Displacement Map");
logoScanDisp1.property("Max Horizontal Displacement").setValue(100);
logoScanDisp1.property("Max Vertical Displacement").setValue(0);
var logoScanDisp2 = logoScanEffects.Effects.addProperty("ADBE Displacement Map");
logoScanDisp2.property("Max Horizontal Displacement").setValue(200);
logoScanDisp2.property("Max Vertical Displacement").setValue(0);
var logoScanColorama= logoScanEffects.Effects.addProperty("Colorama");
logoScanColorama.property("Add Phase").setValue(1);
logoScanColorama.property("Modify Alpha").setValue(false);
var logoScanGlow1= logoScanEffects.Effects.addProperty("Glow");
logoScanGlow1.property("Glow Radius").setValue(50);
var logoScanGlow2= logoScanEffects.Effects.addProperty("Glow");
logoScanGlow2.property("Glow Radius").setValue(200);
var logoScanGlow3= logoScanEffects.Effects.addProperty("Glow");
logoScanGlow3.property("Glow Radius").setValue(500);

//Galutinis pikselinis raidziu atidengimas pridedamas i pagrindine kompozicija
var finishedLetters = myComp.layers.add(pixelLogoComp);

//Kuriamos kompiuterio figuros
drawShape(myComp, coordsScreenBot, inTangScreenBot, outTangScreenBot, [0, 0, 0], 30, 2, 1, 5, shapeScreenBot);
drawShape(myComp, coordsScreenL, inTangScreenL, outTangScreenL, [0, 0, 0], 30, 1, 1, 10, shapeScreenL);
drawShape(myComp, coordsScreenR, inTangScreenR, outTangScreenR, [0, 0, 0], 30, 1, 1, 10, shapeScreenR);
drawShape(myComp, coordsScreen, inTangScreen, outTangScreen, [0, 0, 0], 30, 1, 1, 10, shapeScreen);

//Kompiuterio apaciai kuriama trim path animacija ir priskiriamas spalvu valdiklis
var trimLayer1 = myComp.layer(shapeScreenBot).property("Contents").addProperty("ADBE Vector Filter - Trim");
var trimColor1 = myComp.layer(shapeScreenBot).property("Contents").property("ADBE Vector Graphic - Stroke");
trimColor1.property("Color").expression = '''thisComp.layer("Controller").effect("PC Outline Color")("Color");''';
trimLayer1.property("End").expression =
'''var t = time;
var tSpeed = thisComp.layer("Controller").effect("Animation Duration")("Slider");
var t1 = 0;
var t2 = tSpeed / 17 * 8;

linear(t, t1, t2, 0, 100);
''';

//Kompiuterio kairiajam stovui kuriama trim path animacija ir priskiriamas spalvu valdiklis
var trimLayer2 = myComp.layer(shapeScreenL).property("Contents").addProperty("ADBE Vector Filter - Trim");
var trimColor2 = myComp.layer(shapeScreenL).property("Contents").property("ADBE Vector Graphic - Stroke");
trimColor2.property("Color").expression = '''thisComp.layer("Controller").effect("PC Outline Color")("Color");''';
trimLayer2.property("End").expression =
'''var t = time;
var tSpeed = thisComp.layer("Controller").effect("Animation Duration")("Slider");
var t1 = tSpeed / 17 * 2;
var t2 = tSpeed / 17 * 4;

linear(t, t1, t2, 0, 100);
''';

//Kompiuterio desiniajam stovui kuriama trim path animacija ir priskiriamas spalvu valdiklis
var trimLayer3 = myComp.layer(shapeScreenR).property("Contents").addProperty("ADBE Vector Filter - Trim");
var trimColor3 = myComp.layer(shapeScreenR).property("Contents").property("ADBE Vector Graphic - Stroke");
trimColor3.property("Color").expression = '''thisComp.layer("Controller").effect("PC Outline Color")("Color");''';
trimLayer3.property("Start").expression =
'''var t = time;
var tSpeed = thisComp.layer("Controller").effect("Animation Duration")("Slider");
var t1 = tSpeed / 17 * 6;
var t2 = tSpeed / 17 * 8;

linear(t, t1, t2, 100, 0);
''';

//Kompiuterio ekrano linijoms kuriama trim path animacija ir priskiriamas spalvu valdiklis
var trimLayer4 = myComp.layer(shapeScreen).property("Contents").addProperty("ADBE Vector Filter - Trim");
var trimColor4 = myComp.layer(shapeScreen).property("Contents").property("ADBE Vector Graphic - Stroke");
trimColor4.property("Color").expression = '''thisComp.layer("Controller").effect("PC Outline Color")("Color");''';
trimLayer4.property("Start").expression =
'''var t = time;
var tSpeed = thisComp.layer("Controller").effect("Animation Duration")("Slider");
var t1 = tSpeed / 17 * 4;
var t2 = tSpeed / 17 * 11;

if(t < t1){
	61;
}
else if(t > t2){
	0
}
else{
	easeIn(t, t1, t2, 61, 0);
}
''';
trimLayer4.property("End").expression =
'''var t = time;
var tSpeed = thisComp.layer("Controller").effect("Animation Duration")("Slider");
var t1 = tSpeed / 17 * 4;
var t2 = tSpeed / 17 * 11;

if(t < t1){
	61;
}
else if(t > t2){
	100
}
else{
	easeIn(t, t1, t2, 61, 100);
}
''';

//Kuriamas kompiuterio stovo uzpildas ir jo atidengimas, priskiriamas spalvu valdiklis
var standFill = myComp.layers.addShape();
standFill.name = "PC_Stand EXP";
var standFillRect = standFill.property("Contents").addProperty("ADBE Vector Shape - Rect");
standFillRect.property("Size").setValue([145, 75]);
standFillRect.property("Position").setValue([2, 261]);
var standFillFill =standFill.property("Contents").addProperty("ADBE Vector Graphic - Fill");
standFillFill.property("Color").expression = '''thisComp.layer("Controller").effect("PC Outline Color")("Color");''';
standFillFill.property("Opacity").expression = 
'''var t = time;
var tSpeed = thisComp.layer("Controller").effect("Animation Duration")("Slider");
var t1 = tSpeed / 17 * 11;
var t2 = tSpeed / 17 * 12;

linear(t, t1, t2, 0, 100);
''';

//Kuriamas kompiuterio ekrano uzpildas ir jo atidengimas, priskiriamas spalvu valdiklis
var screenFill = myComp.layers.addShape();
screenFill.name = "PC_Screen_Fill EXP";
var screenFillRect = screenFill.property("Contents").addProperty("ADBE Vector Shape - Rect");
screenFillRect.property("Size").setValue([784, 526]);
screenFillRect.property("Position").setValue([-2, -50]);
var screenFillFill =screenFill.property("Contents").addProperty("ADBE Vector Graphic - Fill");
screenFillFill.property("Color").expression = '''thisComp.layer("Controller").effect("Screen Color")("Color");''';
screenFillFill.property("Opacity").expression = 
'''var t = time;
var tSpeed = thisComp.layer("Controller").effect("Animation Duration")("Slider");
var t1 = tSpeed / 17 * 11;
var t2 = tSpeed / 17 * 12;

linear(t, t1, t2, 0, 100);
''';
//Kompiuterio ekrano uzpildui suteikiamas glow efektas
var screenFillGlow= screenFill.Effects.addProperty("Glow");
screenFillGlow.property("Glow Threshold").setValue(20 * 2.55);
screenFillGlow.property("Glow Radius").setValue(200);
var screenFillGlow2= screenFill.Effects.addProperty("Glow");
screenFillGlow2.property("Glow Threshold").setValue(50 * 2.55);
screenFillGlow2.property("Glow Radius").setValue(30);
screenFillGlow2.property("Glow Intensity").setValue(0.1);
screenFillGlow2.property("Glow Colors").setValue(2);
screenFill.moveAfter(myComp.layer("PixelLogo")); //Sluoksnis perstumiamas del matomumo

//Kuriamas fono efektas
var bgLayer = myComp.layers.addSolid([0, 0, 0], "BG", compW, compH, compAR, (durationComp));
drawShape(myComp, coordsBG, inTangBG, outTangBG, ([3, 160, 98] / 255), 30, 1, 1, 4, shapeBG);
var bgLineLayer = myComp.layer(shapeBG).property("Contents").addProperty("ADBE Vector Filter - Repeater");
bgLineLayer.property("Copies").setValue(70);
bgLineLayer.property("Transform").property("Position").setValue([60, 0]);
var bgLineDisp = myComp.layer(shapeBG).Effects.addProperty("ADBE Turbulent Displace");
bgLineDisp.property("Amount").setValue(100);
bgLineDisp.property("Size").setValue(190);
bgLineDisp.property("Evolution").expression=
'''var t = time;
var bgSpeed = thisComp.layer("Controller").effect("Background Speed")("Slider");

t * bgSpeed;
''';
var bgLineGlow= myComp.layer(shapeBG).Effects.addProperty("Glow");
bgLineGlow.property("Glow Radius").setValue(40);

/*Fonas perstumiamas i gala del kitu sluoksniu matomumo
Kontroleris perstumiamas i pradzia*/
myComp.layer(shapeBG).moveToEnd();
myComp.layer("BG").moveToEnd();
myComp.layer("Controller").moveToBeginning();