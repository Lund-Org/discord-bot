#!/bin/bash

kill -9 ${ps -aux | grep 'supervisor\|node\|npm' | grep -v "grep" | awk '{print $2}'}
