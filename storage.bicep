// param paramFile object = json(loadTextContent('params.json'))

@minLength(4)
@maxLength(12)
param storageAccountPrefix string = 'martintkbicepstorage'

@allowed([
  'Standard_LRS'
  'Standard_GRS'
])
param skuName string = 'Standard_LRS'

@allowed([
  'dev'
  'stage'
  'prod'
])
param environment string = 'dev'

var isProd = environment == 'prod' ? true : false

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-04-01' = {
  name: '${storageAccountPrefix}${uniqueString(resourceGroup().id)}'
  location: resourceGroup().location
  sku: {
    name: skuName
  }
  kind: 'StorageV2'

  resource blobService 'blobServices' = {
    name: 'default'

    resource imageContainer 'containers' = {
      name: 'images'
    }

    resource thumbnailContainer 'containers' = {
      name: 'thumbnails'
    }

    /* resource prodContainer 'containers' = if (isProd) {
      name: 'prodcontainer'
    } */
  }
}

var key = storageAccount.listKeys().keys[0].value

output storageAccountName string = storageAccount.name
output connectionString string = 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};AccountKey=${key};EndpointSuffix=core.windows.net'
