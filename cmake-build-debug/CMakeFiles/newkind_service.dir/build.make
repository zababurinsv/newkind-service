# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.21

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /snap/clion/178/bin/cmake/linux/bin/cmake

# The command to remove a file.
RM = /snap/clion/178/bin/cmake/linux/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/sergey/Desktop/newkind-service

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/sergey/Desktop/newkind-service/cmake-build-debug

# Include any dependencies generated for this target.
include CMakeFiles/newkind_service.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/newkind_service.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/newkind_service.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/newkind_service.dir/flags.make

CMakeFiles/newkind_service.dir/main.cpp.o: CMakeFiles/newkind_service.dir/flags.make
CMakeFiles/newkind_service.dir/main.cpp.o: ../main.cpp
CMakeFiles/newkind_service.dir/main.cpp.o: CMakeFiles/newkind_service.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/sergey/Desktop/newkind-service/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/newkind_service.dir/main.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/newkind_service.dir/main.cpp.o -MF CMakeFiles/newkind_service.dir/main.cpp.o.d -o CMakeFiles/newkind_service.dir/main.cpp.o -c /home/sergey/Desktop/newkind-service/main.cpp

CMakeFiles/newkind_service.dir/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/newkind_service.dir/main.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/sergey/Desktop/newkind-service/main.cpp > CMakeFiles/newkind_service.dir/main.cpp.i

CMakeFiles/newkind_service.dir/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/newkind_service.dir/main.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/sergey/Desktop/newkind-service/main.cpp -o CMakeFiles/newkind_service.dir/main.cpp.s

# Object files for target newkind_service
newkind_service_OBJECTS = \
"CMakeFiles/newkind_service.dir/main.cpp.o"

# External object files for target newkind_service
newkind_service_EXTERNAL_OBJECTS =

newkind_service: CMakeFiles/newkind_service.dir/main.cpp.o
newkind_service: CMakeFiles/newkind_service.dir/build.make
newkind_service: CMakeFiles/newkind_service.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/sergey/Desktop/newkind-service/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable newkind_service"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/newkind_service.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/newkind_service.dir/build: newkind_service
.PHONY : CMakeFiles/newkind_service.dir/build

CMakeFiles/newkind_service.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/newkind_service.dir/cmake_clean.cmake
.PHONY : CMakeFiles/newkind_service.dir/clean

CMakeFiles/newkind_service.dir/depend:
	cd /home/sergey/Desktop/newkind-service/cmake-build-debug && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/sergey/Desktop/newkind-service /home/sergey/Desktop/newkind-service /home/sergey/Desktop/newkind-service/cmake-build-debug /home/sergey/Desktop/newkind-service/cmake-build-debug /home/sergey/Desktop/newkind-service/cmake-build-debug/CMakeFiles/newkind_service.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/newkind_service.dir/depend

