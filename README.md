[![Build Status](https://travis-ci.org/ludoblues/JSONInclude.svg?branch=master)](https://travis-ci.org/ludoblues/JSONInclude)

# JSONInclude
Able to determine if an entity contains all properties and values of another one

## Install

```
npm install json-include
```

## Methods

**`JSONInclude.does(Model, Entity)`**

Return true if Model contains every properties and values of Entity, whatever the order

**`jsonInclude.haveTo(Model, Entity)`**

Complete Entity so it can contains every values of Model.
