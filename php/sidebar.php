
<?php 
    // SQL server variables
    $servername = "localhost:3306";

    $username  = "Oliver";

    $password = "Plants123!";

    $db = "portfolio";

    // Create the connection
    $connection = new mysqli($servername, $username, $password, $db);

    // Check the connection
    if($connection->connect_error){

        die("Connection failed: " . $connection->connect_error);

    }

    // Init JSON data
    $myJSONData = new stdClass();

    // Create array to become JSON data at the end
    $JSONArray = array();
   

    // Create the SQL query
    $sql = "SELECT * FROM sidebarinfo";
    $result = $connection->query($sql);
    
    // Test if there's at least one row
    if($result->num_rows > 0) {
        // Init counter
        $i = 0;
        // Get each side quote in the table - then turn it into JSON to send back to JS file
        while($row = $result->fetch_assoc()){
            $JSONArray[$i] = $row;
            $i++;
        }
    } 

    // Create JSON var
    $myJSONData = json_encode($JSONArray);


    $connection->close();


    // Send JSON back to browser
    echo $myJSONData;

?>



