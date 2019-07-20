<?php
if(isset($_POST['submit'])){
$filename=$_POST['text'];
$file=$_FILES['file'];
$fileName =$_FILES['file']['name'];
$fileTmpName =$_FILES['file']['tmp_name'];
$fileSize =$_FILES['file']['size'];
$fileError =$_FILES['file']['error'];
$fileType =$_FILES['file']['type'];
$fileExt=explode('.',$fileName);
$fileActualExt= strtolower(end($fileExt));
$allowed=array('jpg','jpeg','png');
// $command = escapeshellcmd('/test.py');
shell_exec('python background.py');

shell_exec('python test.py');
// echo $output;
if(in_array($fileActualExt,$allowed)){
if($fileError===0){
if($fileSize<1000000){
$fileNameNew=$filename.".".$fileActualExt;
$fileDestination='uploads/'.$fileNameNew;
move_uploaded_file($fileTmpName,$fileDestination);
header("Location:uploadsuccess.php");
// header("Location:index.php?uploadsuccess");
}
}else{
echo "your file is too large to upload";
}
}
else{
echo "There was an error!";
}
}else{
    echo "You can't upload this type of file";
}