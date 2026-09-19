@extends('layout')

@section('content')
    <h1>Student List</h1>

    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Course</th>
            </tr>
        </thead>
        <tbody>
            @foreach($students as $student)
            <tr>
                <td>{{ $student->name }}</td>
                <td>{{ $student->age }}</td>
                <td>{{ $student->course }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @endsection