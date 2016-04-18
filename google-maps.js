var map;

function createMarker(vol, point, description) {
        var imageChoiceArr = {
            "girl": "tree.png",
            "boy": "burger.png"
        };
        //imageChoiceArr["shadow"] = "";
        //imageChoiceArr["girl"] = "final_girl_marker.png";
        //imageChoiceArr["boy"] = "final_boy_marker.png";
        //imageChoiceArr["shadow"] = "";
                /*var imageChoiceArr = {
                    "girl": "final_girl_marker.png",
                    "boy": "inal_boy_marker.png"
                };*/
        // Create the custom image array
        var markerImg;
        //assigns marker image & its shadow
        if (vol.getAttribute("genre") == "girl") {
            markerImg = imageChoiceArr["girl"];
        } else {
            markerImg = imageChoiceArr["boy"];
        }
        //imgShadow = imageChoiceArr["shadow"];
        //var marker = new google.maps.Marker({
        //  position: point,
        //  icon: markerImg,
        //  shadow: imgShadow
        //});
        var marker = new google.maps.Marker({
            position: point,
            icon: markerImg,
        });
        //Assembles & applies style formatting to each marker
        google.maps.event.addListener(marker, 'click', function() {
            //Check to see if the infoWindow already exists and is not null
            //if (!infoWindow) {
            //   //if the infoWindow does not exist, create an
            //   //empty InfoWindow object
            //  alert(infoWindow);// undefined?
            infoWindow = new google.maps.InfoWindow();
            //}
            var infoWinText = "";
            //---------------name portion----------------
            var name = description.getElementsByTagName("NAME");

            //var name = description.getElementsByTagName("name")[0].firstChild.nodeValue;
            //var name = description.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            infoWinText = '<table style="width=300px; height=120px; text-align=left;">' + '<tr><td colspan=2 style="font-family=arial; font-weight=bold; color=maroon;">' + name[0].childNodes[0].nodeValue + '</td></tr>';
            //---------------job portion------------------
            var jobList = description.getElementsByTagName("JOB");
            //var name = description.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            infoWinText += '<tr style="vertical-align=top;">' + '<td style="font-family=arial;">' + '<div style="font-size=10pt;"><job>';
            for (var i = 0; i < jobList.length; i++) {
                //infoWinText += ' - ' + jobList[i].nodeValue + '<br>';
                //infoWinText += ' - ' + jobList[i].childNodes[0].nodeValue + '<br>';
                infoWinText += ' - ' + jobList[i].childNodes[0].nodeValue + '<br>';
            }
            infoWinText += '</div></td>';
            //---------------img portion------------------

            var persImage = description.getElementsByTagName("IMG");

            //var name = description.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            infoWinText += '<td><div><img src=' + persImage[0].childNodes[0].nodeValue + ' style="width=100; height=100;"></div></td></tr></table>';
            infoWindow.setContent(infoWinText);
            //alert(infoWindow.getContent());
            infoWindow.open(map, marker);
        }); //new event.addListener
        return marker;
    } //end createMarker
function connectXML() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var xmlDoc = xhr.responseXML;
            //lists are created for createMarker function
            //var volunteerTeam = xmlDoc.getElementsByTagName("volt");
            var volts = xmlDoc.documentElement.getElementsByTagName("volt");
            var locations = xmlDoc.documentElement.getElementsByTagName("location");
            var descriptions = xmlDoc.documentElement.getElementsByTagName("description");
            //var volts = xmlDoc.getElementsByTagName("volt");
            //var locations = xmlDoc.getElementsByTagName("location");
            //var descriptions = xmlDoc.getElementsByTagName("description");
            // Iterates through the nodes & creates a marker for person
            var marker, point;
            for (var i = 0; i < volts.length; i++) {
                point = new google.maps.LatLng(parseFloat(locations[i].getAttribute("lat")), parseFloat(locations[i].getAttribute("long")));
                marker = createMarker(volts[i], point, descriptions[i]);
                marker.setMap(map);
            };
        } //if
    }
    xhr.open("GET", "volunteers.xml", true);
    xhr.send();
}

function initialize() {
        var mapOptions = {
            center: {
                lat: 41.229691,
                lng: -84.414198
            },
            zoom: 8,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        connectXML();
    } //end initialize
google.maps.event.addDomListener(window, 'load', initialize);
