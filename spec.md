# GoLogin Automation Web Application

## Overview
A web application that replicates GoLogin automation functionality with a Bengali interface for managing browser profiles and automated web operations.

## Core Features

### Profile Management
- Display a list of browser profiles with checkboxes for selection
- Allow users to select multiple profiles for batch operations

### Automation Controls
- Input field for target URL entry
- Input field for wait time configuration (in seconds)
- Toggle switch to enable/disable auto-click functionality
- Start Queue button to begin automation process
- Stop button to halt ongoing operations

### Real-time Logging
- Log panel displaying execution messages and progress updates
- Live updates showing current operation status for each profile

### Queue Management
- Process selected profiles sequentially or in parallel
- Track execution state for each profile in the queue

## Backend Functionality

### Data Storage
- Store browser profile configurations and metadata
- Persist automation settings and preferences
- Save execution logs and history

### Queue Processing
- Manage execution queue for selected profiles
- Simulate browser profile launching operations
- Handle URL navigation and page loading
- Perform automated scrolling actions
- Execute clickable element interactions based on auto-click settings
- Generate progress updates and log messages

### State Management
- Track current execution status for each profile
- Provide real-time updates to frontend
- Handle start/stop operations for queue management

## User Interface Language
- All interface elements, labels, and messages displayed in Bengali
- Log messages and status updates in Bengali

## Real-time Updates
- Live progress tracking for ongoing automation tasks
- Immediate feedback for user actions (start/stop operations)
- Real-time log message display without page refresh
