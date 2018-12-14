# memo


```puml
@startuml

title cmd new (create new project)

#lightgreen:cmd new {projectname};
if (Is the new project name "foo"?) then (no)
  :end;
  end
else (yes)
#orange:Please enter github 'owner/repo';
repeat
  #orange:Please enter inject key "xxx";
repeat while (next expression)
#orange:create project path -> "path/to/hoge"\nare you sure?;
split
  :yes;
  :do;
  stop
split again
  :no;
  end



@enduml
```