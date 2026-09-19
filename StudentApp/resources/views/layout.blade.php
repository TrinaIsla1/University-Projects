<!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Student Application</title>
    <style>
        body{
            font-family: sans-serif; margin: 40px;
        }

        .container{
            border: 2px solid #333; padding: 20px; border-radius: 8px;
        }

        table{
            width: 100%; border-collapse: collapse; margin-top: 20px;
        }

        th, td{
            border: 1px solid #ddd; padding: 8px; text-align: left;
        }

        th{
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <div class="container">
        @yield('content')
    </div>


</body>
</html>