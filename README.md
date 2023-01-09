# MangaLatest
A discord bot made with Javascript that can retrieve the latest chapter of the manga requested using Mangadex's API. Uses prefix commands to return relevant queired manga ID's 
which can be used to retrieve the latest chapter. Uses MongoDB to allow for user's to save desired mangaIDs under their discord ids. 

## Installation

Install packages and dependencies
```
npm install
```
## Technologies
+ Javascript
+ MongoDB 

## Usage 

To query for an manga (returns name of manga and relevant manga id):
```
!manga <name_of_manga>
```

Retrieve latest chapter using retrieved manga ID
```
!chapters <manga_id>
```

Save desired manga to database
```
!save <manga_id>
```
## Credit
Credits to Mangadex and their team for the API that they have created
