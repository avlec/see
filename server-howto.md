Start the server
```
node server.js
```

Upload some files. You can also try running filters before and see it complain
```
curl -X POST localhost:3000/uploadFiles -F "file=@./hello.py" -b cookies -c cookies
1 uploaded; 0 replaced
```

Run a filter. See the list of filter arrays in the server code
```
curl localhost:3000/runFileFilter/runPythonLint/samplefilter.py -c cookies -b cookies
python3: can't open file 'filters/myFilter.py': [Errno 2]No such file or directory
```

The `-b` and `-c` flags to curl tell it to maintain a session. Without it, the
`see-uploads/` folder will just keep uploading your file as a new user.
