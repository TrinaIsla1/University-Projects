<!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Student Records</title>
</head>
<body>
    <h1>Student Lists: </h1>

    <div style="border: 1px solid #000; padding: 10px; margin-bottom: 5px;">
        <strong>Student 1: </strong>
        {{ $students[0]->name}} |
        {{ $students[0]->age}} |
        {{ $students[0]->course}} |
    </div>

    <div style="border: 1px solid #000; padding: 10px; margin-bottom: 5px;">
        <strong>Student 2: </strong>
        {{ $students[1]->name}} |
        {{ $students[1]->age}} |
        {{ $students[1]->course}} |
    </div>

    <div style="border: 1px solid #000; padding: 10px; margin-bottom: 5px;">
        <strong>Student 3: </strong>
        {{ $students[2]->name}} |
        {{ $students[2]->age}} |
        {{ $students[2]->course}} |
    </div>

</body>
</html>