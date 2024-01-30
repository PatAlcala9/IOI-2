<template>
  <q-page v-if="dark" padding class="page--dark">
    <div class="grid-container">
        <!-- <input id="camera" type="file" accept="image/*" capture="camera" hidden/> -->

        <q-input dark class="searchbar" bg-color="black" color="white" rounded outlined v-model="appno" mask="##-########" label="Application Number" @keydown="loadData">
          <template v-slot:append>
            <q-avatar>
              <q-icon v-if="appno === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="clearData_search" />
            </q-avatar>
          </template>
        </q-input>

        <transition appear enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
          <q-btn v-if="appno !== ''" round unelevated class="searchcircle" color="primary" @click="loadData"><q-icon name="search"/></q-btn>
        </transition>

        <q-btn class="logout" unelevated rounded color="primary" label="Logout" @click="logout"/>

        <div class="ownername">
          <iLabel value="Owner Name :"></iLabel>
          <q-input readonly bg-color="blue-grey-3" filled v-model="name" style="font-size: 20px "></q-input>
        </div>

        <div class="address">
          <iLabel value="Address :"></iLabel>
          <q-input readonly bg-color="blue-grey-3" filled v-model="address" style="font-size: 20px "></q-input>
        </div>

        <div class="location">
          <iLabel value="Location of Application :"></iLabel>
          <q-input readonly bg-color="blue-grey-3" filled v-model="location" style="font-size: 20px "><q-btn v-if="appid > 0" flat color="primary" label="Locate" @click="showmap" /></q-input>
        </div>

        <div class="scope">
          <iLabel value="Scope of Work :"></iLabel>
          <q-input readonly bg-color="blue-grey-3" filled v-model="scope" style="font-size: 20px "></q-input>
        </div>

        <div class="typeoruse">
          <iLabel value="Type or Use :"></iLabel>
          <q-input readonly bg-color="blue-grey-3" filled v-model="typeoruse" style="font-size: 20px "></q-input>
        </div>
    </div>
    <div><br/><br/></div>

    <!-- <div class="typeofcon" v-if="showTypeofConstruction">
      <label>Type of Construction :</label><br />
      <q-btn-dropdown v-if="savedTypeBool" split unelevated color="white" text-color="black" @input="checkSavedDropdown">
        <template v-slot:label>
          <div class="row items-center no-wrap">
            <div class="text-center">{{selectedType}}</div>
          </div>
        </template>

        <q-list>
          <q-item clickable v-close-popup @click="setType('Type I')">
            <q-item-section>
              <q-item-label>Type I</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="setType('Type II')">
            <q-item-section>
              <q-item-label>Type II</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="setType('Type III-A')">
            <q-item-section>
              <q-item-label>Type III-A</q-item-label>
            </q-item-section>
          </q-item>

           <q-item clickable v-close-popup @click="setType('Type III-B')">
            <q-item-section>
              <q-item-label>Type III-B</q-item-label>
            </q-item-section>
          </q-item>

           <q-item clickable v-close-popup @click="setType('Type IV')">
            <q-item-section>
              <q-item-label>Type IV</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="setType('Type V')">
            <q-item-section>
              <q-item-label>Type V</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn-dropdown v-else disable-dropdown split unelevated color="white" text-color="black">
        <template v-slot:label>
          <div class="row items-center no-wrap">
            <div class="text-center">{{selectedType}}</div>
          </div>
        </template>
      </q-btn-dropdown>
    </div>

    <div class="dtable" v-if="userdefaultaccess">
        <q-table class="datatable" title="Findings" :data="empdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom></q-table>
    </div>

    <div class="dtable" v-if="userbuildinglgaccess">
      <br/>
      <q-table class="datatable" title="Findings for Building Line and Grade" :data="bldglgdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" row-key="name" flat hide-bottom>
        <template v-slot:top v-if="appid > 0">
          <label style="color: black  font-size:1rem">Findings for Building Line and Grade</label>
          <q-space />
          <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbuildinglineandgrade = true" />
          <q-btn class="on-right mobilemode" flat dense color="orange-10" :disable="loading" label="Remove last" @click="removebuildinglineandgrade" />
          <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbuildinglineandgrade" />
          <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldglgdata, 'LINE AND GRADE')" />
        </template>

        <template v-slot:body="props">
          <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Building LG')">
            <q-td key="description" :props="props">
              {{ props.row.name }}
              <q-popup-edit v-model="props.row.name" title="Edit Data">
                <q-input v-model="props.row.name" dense autofocus />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldglgdata, 'LINE AND GRADE')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BldgLG')"/>

      <div v-if="imagesBldgLGU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBldgLGI">
          <q-carousel-slide v-for="i in imagesBldgLGU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowblg" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebuildinglineandgrade(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="useroccupancylgaccess">
      <br/>
      <q-table class="datatable" title="Findings for Occupancy Line and Grade" :data="occlgdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Occupancy Line and Grade</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addoccupancylineandgrade = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearalloccupancylineandgrade" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occlgdata, 'LINE AND GRADE')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Occupancy LG')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occlgdata, 'LINE AND GRADE')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('OccLG')"/>

      <div v-if="imagesOccLGU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesOccLGI">
          <q-carousel-slide v-for="image in imagesOccLGU" :key="image" :name="image" :img-src="image"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowolg" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeoccupancylineandgrade(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="userbuildingarchaccess">
      <br/>
      <q-table class="datatable" title="Findings for Building Architecture" :data="bldgarchdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Building Architecture</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbuildingarchitecture = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbuildingarchitecture" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgarchdata, 'ARCHITECTURAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Building Arch')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgarchdata, 'ARCHITECTURAL')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BldgArch')"/>

      <div v-if="imagesBldgArchU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBldgArchI">
          <q-carousel-slide v-for="i in imagesBldgArchU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowbar" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebuildingarchitecture(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="useroccupancyarchaccess">
      <br/>
      <q-table class="datatable" title="Findings for Occupancy Architecture" :data="occarchdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Occupancy Architecture</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addoccupancyarchitecture = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearalloccupancyarchitecture" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occarchdata, 'ARCHITECTURAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Occupancy Arch')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occarchdata, 'ARCHITECTURAL')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('OccArch')"/>

      <div v-if="imagesOccArchU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesOccArchI">
          <q-carousel-slide v-for="i in imagesOccArchU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowoar" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeoccupancyarchitecture(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="userbuildingstructaccess">
      <br/>
      <q-table class="datatable" title="Findings for Building Structural" :data="bldgstructdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Building Structural</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbuildingstructural = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbuildingstructural" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgstructdata, 'STRUCTURAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Building Struct')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgstructdata, 'STRUCTURAL')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BldgStruct')"/>

      <div v-if="imagesBldgStructU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBldgStructI">
          <q-carousel-slide v-for="i in imagesBldgStructU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowbst" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebuildingstructural(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="useroccupancystructaccess">
      <br/>
      <q-table class="datatable" title="Findings for Occupancy Structural" :data="occstructdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Occupancy Structural</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addoccupancystructural = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearalloccupancystructural" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occstructdata, 'STRUCTURAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Occupancy Struct')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occstructdata, 'STRUCTURAL')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('OccStruct')"/>

      <div v-if="imagesOccStructU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesOccStructI">
          <q-carousel-slide v-for="i in imagesOccStructU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowost" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeoccupancystructural(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="userbuildingplumaccess">
      <br/>
      <q-table class="datatable" title="Findings for Building Sanitary/Plumbing" :data="bldgplumdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Building Sanitary/Plumbing</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbuildingplumbing = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbuildingplumbing" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgplumdata, 'SANITARY/PLUMBING')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Building Plum')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgplumdata, 'SANITARY/PLUMBING')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BldgPlum')"/>

      <div v-if="imagesBldgPlumU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBldgPlumI">
          <q-carousel-slide v-for="i in imagesBldgPlumU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowbpl" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebuildingplumbing(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="useroccupancyplumaccess">
      <br/>
      <q-table class="datatable" title="Findings for Occupancy Sanitary/Plumbing" :data="occplumdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Occupancy Sanitary/Plumbing</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addoccupancyplumbing = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearalloccupancyplumbing" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occplumdata, 'SANITARY/PLUMBING')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Occupancy Plum')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occplumdata, 'SANITARY/PLUMBING')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('OccPlum')"/>

      <div v-if="imagesOccPlumU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesOccPlumI">
          <q-carousel-slide v-for="i in imagesOccPlumU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowopl" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeoccupancyplumbing(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="userbuildingelecaccess">
      <br/>
      <q-table class="datatable" title="Findings for Building Sanitary/Plumbing" :data="bldgelecdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Building Electrical</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbuildingelectrical = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbuildingelectrical" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgelecdata, 'ELECTRICAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Building Elec')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgelecdata, 'ELECTRICAL')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BldgElec')"/>

      <div v-if="imagesBldgElecU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBldgElecI">
          <q-carousel-slide v-for="i in imagesBldgElecU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowbel" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebuildingelectrical(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="useroccupancyelecaccess">
      <br/>
      <q-table class="datatable" title="Findings for Occupancy Sanitary/Plumbing" :data="occelecdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Occupancy Electrical</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addoccupancyelectrical = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearalloccupancyelec" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occelecdata, 'ELECTRICAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Occupancy Elec')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occelecdata, 'ELECTRICAL')" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('OccElec')"/>

      <div v-if="imagesOccElecU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesOccElecI">
          <q-carousel-slide v-for="i in imagesOccElecU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

      <q-dialog v-model="deleterowoel" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeoccupancyelectrical(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="userbuildingmechaccess">
      <br/>
      <q-table class="datatable" title="Findings for Building Sanitary/Plumbing" :data="bldgmechdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Building Mechanical</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbuildingmechanical = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbuildingmechanical" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgmechdata, 'MECHANICAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Building Mech')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgmechdata, 'MECHANICAL')" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BldgMech')"/>

      <div v-if="imagesBldgMechU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBldgMechI">
          <q-carousel-slide v-for="i in imagesBldgMechU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

      <q-dialog v-model="deleterowbme" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebuildingmechanical(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="useroccupancymechaccess">
      <br/>
      <q-table class="datatable" title="Findings for Occupancy Sanitary/Plumbing" :data="occmechdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Occupancy Mechanical</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addoccupancymechanical = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearalloccupancymech" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occmechdata, 'MECHANICAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Occupancy Mech')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occmechdata, 'MECHANICAL')" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('OccMech')"/>

      <div v-if="imagesOccMechU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesOccMechI">
          <q-carousel-slide v-for="i in imagesOccMechU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

      <q-dialog v-model="deleterowome" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeoccupancymechanical(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="usersignageaccess">
      <br/>
      <q-table class="datatable" title="Findings for Signage" :data="signdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Signage</label>
            <q-space />
            <q-btn v-if="signageallowadd" flat dense color="secondary" :disable="loading" label="Add row" @click="addsignagerow = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallsignage" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveSignage2" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Signage')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveSignage2" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('Signage')"/>

      <div v-if="imagesSign.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesSignI">
          <q-carousel-slide v-for="i in imagesSignU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

      <q-dialog v-model="deleterowsig" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
          <q-card-section>
            <div class="text-h6">Delete this Item</div>
          </q-card-section>

          <q-card-actions align="right" class="bg-blue-grey-9">
            <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removesignage(deleteitem)"/>
            <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="dtable" v-if="userelectricalaccess">
      <br/>
      <q-table class="datatable" title="Findings for Electrical" :data="elecdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Electrical</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addelectrical = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallelectrical" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveElectrical2" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Electrical')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveElectrical2" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('Electrical')"/>

      <div v-if="imagesElec.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesElecI">
          <q-carousel-slide v-for="i in imagesElecU" :key="i" :name="i" :img-src="i" firstSlide/>
        </q-carousel>
      </div>

      <q-dialog v-model="deleterowele" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
          <q-card-section>
            <div class="text-h6">Delete this Item</div>
          </q-card-section>

          <q-card-actions align="right" class="bg-blue-grey-9">
            <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeelectrical(deleteitem)"/>
            <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="dtable" v-if="usermechanicalaccess">
      <br/>
      <q-table class="datatable" title="Findings for Mechanical" :data="mechdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Mechanical</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addmechanical = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallmechanical" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveMechanical2" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Mechanical')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveMechanical2" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('Mechanical')"/>

      <div v-if="imagesMech.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesMechI">
          <q-carousel-slide v-for="i in imagesMechU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

      <q-dialog v-model="deleterowmec" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
          <q-card-section>
            <div class="text-h6">Delete this Item</div>
          </q-card-section>

          <q-card-actions align="right" class="bg-blue-grey-9">
            <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removemechanical(deleteitem)"/>
            <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

     <div class="dtable" v-if="userzoningaccess">
      <br/>
      <q-table class="datatable" title="Findings for Land Use and Zoning" :data="zoningdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Land Use and Zoning</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addzoning = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallzoning" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveZoning"/>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Zoning')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveZoning"/>
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('Zoning')"/>

       <div v-if="imagesZoning.length > 0">
         <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesZoningI">
           <q-carousel-slide v-for="i in imagesZoningU" :key="i" :name="i" :img-src="i"/>
         </q-carousel>
       </div>

      <q-dialog v-model="deleterowzon" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
          <q-card-section>
            <div class="text-h6">Delete this Item</div>
          </q-card-section>

          <q-card-actions align="right" class="bg-blue-grey-9">
            <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removezoning(deleteitem)"/>
            <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

     <div class="dtable" v-if="userbfpaccess">
      <br/>
      <q-table class="datatable" title="Findings for Land Use and Zoning" :data="bfpdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Bureau of Fire</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbfp = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbfp" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBFP"/>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'BFP')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save"  @click="saveBFP"/>
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BFP')"/>

       <div v-if="imagesBFP.length > 0">
         <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBFPI">
           <q-carousel-slide v-for="i in imagesBFPU" :key="i" :name="i" :img-src="i"/>
         </q-carousel>
       </div>

      <q-dialog v-model="deleterowbfp" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
          <q-card-section>
            <div class="text-h6">Delete this Item</div>
          </q-card-section>

          <q-card-actions align="right" class="bg-blue-grey-9">
            <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebfp(deleteitem)"/>
            <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <q-dialog v-model="addrow">
      <q-card>
        <q-card-section dark style="background: #ffab40 ">
          <div class="text-h6">Add Findings</div>
        </q-card-section>
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          height="300px"
          class="bg-primary text-white shadow-1 rounded-borders"
        >
        <q-carousel-slide name="style" class="column no-wrap flex-center" style="background: #2979ff ">
          <label>Description</label>
          <q-input dark v-model="sdescription" :dense="dense" size="100px"/>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center wide">
          <label>Date Started</label>
          <q-input filled v-model="sdatestart" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="sdatestart" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <label>Date Ended</label>
          <q-input filled v-model="sdateend" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="sdateend" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-carousel-slide>
        </q-carousel>
        <q-card-section v-if="sdescription !== ''" style="background: #2979ff ">
          <q-btn unelevated class="dialogbutton" color="primary" label="Save" @click="addFinder"/>
        </q-card-section>
       </q-card>
    </q-dialog>
    <q-dialog v-model="addrow" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined class="bg-white" v-model="sdescription" :dense="dense"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addFinder"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbuildinglineandgrade" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Building Line and Grade</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBuildingLG"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBuildingLG"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addoccupancylineandgrade" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Occupancy Line and Grade</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addOccupancyLG"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addOccupancyLG"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbuildingarchitecture" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Building Architecture</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBuildingArch"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBuildingArch"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addoccupancyarchitecture" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Occupancy Architecture</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addOccupancyArch"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addOccupancyArch"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbuildingstructural" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Building Structural</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBuildingStruct"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBuildingStruct"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addoccupancystructural" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Occupancy Structural</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addOccupancyStruct"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addOccupancyStruct"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbuildingplumbing" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Building Sanitary/Plumbing</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBuildingPlum"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBuildingPlum"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addoccupancyplumbing" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Occupancy Sanitary/Plumbing</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addOccupancyPlum"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addOccupancyPlum"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbuildingelectrical" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Building Electrical</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBuildingElec"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBuildingElec"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addoccupancyelectrical" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Occupancy Electrical</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addOccupancyElec"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addOccupancyElec"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbuildingmechanical" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Building Mechanical</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBuildingMech"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBuildingMech"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addoccupancymechanical" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Occupancy Mechanical</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addOccupancyMech"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addOccupancyMech"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="addsignagerow" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Signage</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addSignage"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addSignage"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="addelectrical" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Electrical</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addElectrical"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addElectrical"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="addmechanical" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Mechanical</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addMechanical"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addMechanical"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addzoning" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Land Use and Zoning</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addZoning"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addZoning"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbfp" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Bureau of Fire</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBFP"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBFP"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <br/><br/>
    <div class="saveArea" v-if="appid > 0">
      <q-btn unelevated class="savebutton" color="primary" icon="check" label="Save" @click="saveData" />
    </div>

    <q-dialog v-model="map" :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down" style="opactity: 0.5">
      <q-card class="bg-primary text-white" style="opacity: 0.9">

        <q-card-section>
          <div class="text-h6">OCBO Map</div>
        </q-card-section>

       <q-card-section class="row justify-center">
          <mapa></mapa>
        </q-card-section>

        <q-card-section class="row justify-center">
          <q-btn unelevated class="mapbutton" color="positive" label="OK" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog> -->
  </q-page>

  <q-page v-else padding class="page">
    <div class="grid-container">
      <q-input class="searchbar" bg-color="white" rounded outlined v-model="appno" mask="##-########" label="Application Number" >
        <template v-slot:append>
          <q-avatar>
            <q-icon v-if="appno === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="clearData_search" />
          </q-avatar>
        </template>
      </q-input>

      <transition appear enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
        <q-btn v-if="appno !== ''" round unelevated class="searchcircle" color="primary" @click="loadData"><q-icon name="search"/></q-btn>
      </transition>

      <q-btn class="logout" unelevated rounded color="primary" label="Logout" @click="logout"/>
    </div>
    <div><br/></div>

    <div class="details">
        <div class="ownername">
          <iLabel value="Owner Name :"></iLabel>
          <q-input readonly bg-color="blue-grey-3" filled v-model="name" style="font-size: 20px "></q-input>
        </div>

        <div class="address">
          <iLabel value="Address :"></iLabel>
          <q-input readonly bg-color="blue-grey-3" filled v-model="address" style="font-size: 20px "></q-input>
        </div>
        <div class="location">
          <iLabel value="Location of Application :"></iLabel>
          <q-input readonly bg-color="blue-grey-3" filled v-model="location" style="font-size: 20px "><q-btn v-if="appid > 0" flat color="primary" label="Locate" @click="showmap" /></q-input>
        </div>
        <div class="scope">
          <iLabel value="Scope of Work :"></iLabel>
          <q-input readonly bg-color="blue-grey-3" filled v-model="scope" style="font-size: 20px "></q-input>
        </div>
        <div class="typeoruse">
          <iLabel value="Type or Use :"></iLabel>
          <q-input readonly bg-color="blue-grey-3" filled v-model="typeoruse" style="font-size: 20px "></q-input>
        </div>
    </div>
    <div><br/><br/></div>

    <div class="typeofcon" v-if="appid > 0">
      <iLabel value="Type of Construction :"></iLabel><br />
      <q-btn-dropdown v-if="savedTypeBool" split unelevated color="white" text-color="black" @input="checkSavedDropdown">
        <template v-slot:label>
          <div class="row items-center no-wrap">
            <div class="text-center">{{selectedType}}</div>
          </div>
        </template>

        <q-list>
          <q-item clickable v-close-popup @click="setType('Type I')">
            <q-item-section>
              <q-item-label>Type I</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="setType('Type II')">
            <q-item-section>
              <q-item-label>Type II</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="setType('Type III-A')">
            <q-item-section>
              <q-item-label>Type III-A</q-item-label>
            </q-item-section>
          </q-item>

           <q-item clickable v-close-popup @click="setType('Type III-B')">
            <q-item-section>
              <q-item-label>Type III-B</q-item-label>
            </q-item-section>
          </q-item>

           <q-item clickable v-close-popup @click="setType('Type IV')">
            <q-item-section>
              <q-item-label>Type IV</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="setType('Type V')">
            <q-item-section>
              <q-item-label>Type V</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

       <q-btn-dropdown v-else disable-dropdown split unelevated color="white" text-color="black">
        <template v-slot:label>
          <div class="row items-center no-wrap">
            <div class="text-center">{{selectedType}}</div>
          </div>
        </template>
      </q-btn-dropdown>
    </div>

     <!--<div class="dtable" v-if="userdefaultaccess">
        <q-table class="datatable" title="Findings" :data="empdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom></q-table>
    </div>

    <div class="dtable" v-if="userbuildinglgaccess">
      <input id="cameraBldgLG" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Building Line and Grade" :data="bldglgdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" row-key="name" flat hide-bottom>
        <template v-slot:top v-if="appid > 0">
          <label style="color: black  font-size:1rem">Findings for Building Line and Grade</label>
          <q-space />
          <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbuildinglineandgrade = true" />
          <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbuildinglineandgrade" />
          <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldglgdata, 'LINE AND GRADE')" />
        </template>

        <template v-slot:body="props">
          <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Building LG')">
            <q-td key="description" :props="props">
              {{ props.row.name }}
              <q-popup-edit v-model="props.row.name" title="Edit Data">
                <q-input v-model="props.row.name" dense autofocus />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldglgdata, 'LINE AND GRADE')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BldgLG')"/>

      <div v-if="imagesBldgLGU.length > 0">
          <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBldgLGI">
            <q-carousel-slide v-for="i in imagesBldgLGU" :key="i" :name="i" :img-src="i"/>
          </q-carousel>
      </div>

        <q-dialog v-model="deleterowblg" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebuildinglineandgrade(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="useroccupancylgaccess">
      <input id="cameraOccLG" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Occupancy Line and Grade" :data="occlgdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Occupancy Line and Grade</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addoccupancylineandgrade = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearalloccupancylineandgrade" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occlgdata, 'LINE AND GRADE')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Occupancy LG')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occlgdata, 'LINE AND GRADE')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('OccLG')"/>

      <div v-if="imagesOccLGU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesOccLGI">
          <q-carousel-slide v-for="image in imagesOccLGU" :key="image" :name="image" :img-src="image"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowolg" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeoccupancylineandgrade(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="userbuildingarchaccess">
      <input id="cameraBldgArch" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Building Architecture" :data="bldgarchdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Building Architecture</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbuildingarchitecture = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbuildingarchitecture" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgarchdata, 'ARCHITECTURAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Building Arch')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgarchdata, 'ARCHITECTURAL')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BldgArch')"/>

      <div v-if="imagesBldgArchU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBldgArchI">
          <q-carousel-slide v-for="i in imagesBldgArchU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowbar" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebuildingarchitecture(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="useroccupancyarchaccess">
      <input id="cameraOccArch" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Occupancy Architecture" :data="occarchdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Occupancy Architecture</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addoccupancyarchitecture = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearalloccupancyarchitecture" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occarchdata, 'ARCHITECTURAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Occupancy Arch')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occarchdata, 'ARCHITECTURAL')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('OccArch')"/>

      <div v-if="imagesOccArchU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesOccArchI">
          <q-carousel-slide v-for="i in imagesOccArchU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowoar" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeoccupancyarchitecture(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="userbuildingstructaccess">
      <input id="cameraBldgStruct" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Building Structural" :data="bldgstructdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Building Structural</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbuildingstructural = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbuildingstructural" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgstructdata, 'STRUCTURAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Building Struct')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgstructdata, 'STRUCTURAL')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BldgStruct')" />

      <div v-if="imagesBldgStructU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBldgStructI">
          <q-carousel-slide v-for="i in imagesBldgStructU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowbst" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebuildingstructural(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="useroccupancystructaccess">
      <input id="cameraOccStruct" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Occupancy Structural" :data="occstructdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Occupancy Structural</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addoccupancystructural = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearalloccupancystructural" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occstructdata, 'STRUCTURAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Occupancy Struct')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occstructdata, 'STRUCTURAL')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('OccStruct')"/>

      <div v-if="imagesOccStructU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesOccStructI">
          <q-carousel-slide v-for="i in imagesOccStructU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowost" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeoccupancystructural(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="userbuildingplumaccess">
      <input id="cameraBldgPlum" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Building Sanitary/Plumbing" :data="bldgplumdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Building Sanitary/Plumbing</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbuildingplumbing = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbuildingplumbing" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgplumdata, 'SANITARY/PLUMBING')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Building Plum')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgplumdata, 'SANITARY/PLUMBING')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BldgPlum')"/>

      <div v-if="imagesBldgPlumU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBldgPlumI">
          <q-carousel-slide v-for="i in imagesBldgPlumU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowbpl" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebuildingplumbing(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="useroccupancyplumaccess">
      <input id="cameraOccPlum" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Occupancy Sanitary/Plumbing" :data="occplumdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Occupancy Sanitary/Plumbing</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addoccupancyplumbing = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearalloccupancyplumbing" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occplumdata, 'SANITARY/PLUMBING')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Occupancy Plum')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occplumdata, 'SANITARY/PLUMBING')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('OccPlum')"/>

      <div v-if="imagesOccPlumU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesOccPlumI">
          <q-carousel-slide v-for="i in imagesOccPlumU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowopl" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeoccupancyplumbing(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="userbuildingelecaccess">
      <input id="cameraBldgElec" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Building Sanitary/Plumbing" :data="bldgelecdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Building Electrical</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbuildingelectrical = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbuildingelectrical" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgelecdata, 'ELECTRICAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Building Elec')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgelecdata, 'ELECTRICAL')" />
        <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BldgElec')"/>

      <div v-if="imagesBldgElecU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBldgElecI">
          <q-carousel-slide v-for="i in imagesBldgElecU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

        <q-dialog v-model="deleterowbel" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebuildingelectrical(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="useroccupancyelecaccess">
      <input id="cameraOccElec" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Occupancy Sanitary/Plumbing" :data="occelecdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Occupancy Electrical</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addoccupancyelectrical = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearalloccupancyelec" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occelecdata, 'ELECTRICAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Occupancy Elec')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occelecdata, 'ELECTRICAL')" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('OccElec')"/>

      <div v-if="imagesOccElecU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesOccElecI">
          <q-carousel-slide v-for="i in imagesOccElecU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

      <q-dialog v-model="deleterowoel" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeoccupancyelectrical(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="userbuildingmechaccess">
      <input id="cameraBldgMech" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Building Sanitary/Plumbing" :data="bldgmechdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Building Mechanical</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbuildingmechanical = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbuildingmechanical" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgmechdata, 'MECHANICAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Building Mech')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bldgmechdata, 'MECHANICAL')" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BldgMech')"/>

      <div v-if="imagesBldgMechU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBldgMechI">
          <q-carousel-slide v-for="i in imagesBldgMechU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

      <q-dialog v-model="deleterowbme" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebuildingmechanical(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="useroccupancymechaccess">
      <input id="cameraOccMech" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Occupancy Sanitary/Plumbing" :data="occmechdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Occupancy Mechanical</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addoccupancymechanical = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearalloccupancymech" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occmechdata, 'MECHANICAL')" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Occupancy Mech')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveOccupancy2(occmechdata, 'MECHANICAL')" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('OccMech')"/>

      <div v-if="imagesOccMechU.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesOccMechI">
          <q-carousel-slide v-for="i in imagesOccMechU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

      <q-dialog v-model="deleterowome" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
            <q-card-section>
              <div class="text-h6">Delete this Item</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-blue-grey-9">
              <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeoccupancymechanical(deleteitem)"/>
              <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

    <div class="dtable" v-if="usersignageaccess">
      <input id="cameraSignage" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Signage" :data="signdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Signage</label>
            <q-space />
            <q-btn v-if="signageallowadd" flat dense color="secondary" :disable="loading" label="Add row" @click="addsignagerow = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallsignage" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveSignage2" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Signage')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveSignage2" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('Signage')"/>

      <div v-if="imagesSign.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesSignI">
          <q-carousel-slide v-for="i in imagesSignU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

      <q-dialog v-model="deleterowsig" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
          <q-card-section>
            <div class="text-h6">Delete this Item</div>
          </q-card-section>

          <q-card-actions align="right" class="bg-blue-grey-9">
            <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removesignage(deleteitem)"/>
            <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="dtable" v-if="userelectricalaccess">
      <input id="cameraElectrical" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Electrical" :data="elecdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Electrical</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addelectrical = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallelectrical" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveElectrical2" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Electrical')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveElectrical2" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('Electrical')"/>

      <div v-if="imagesElec.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesElecI">
          <q-carousel-slide v-for="i in imagesElecU" :key="i" :name="i" :img-src="i" firstSlide/>
        </q-carousel>
      </div>

      <q-dialog v-model="deleterowele" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
          <q-card-section>
            <div class="text-h6">Delete this Item</div>
          </q-card-section>

          <q-card-actions align="right" class="bg-blue-grey-9">
            <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removeelectrical(deleteitem)"/>
            <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="dtable" v-if="usermechanicalaccess">
      <input id="cameraMechanical" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Mechanical" :data="mechdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Mechanical</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addmechanical = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallmechanical" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveMechanical2" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Mechanical')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" @click="saveMechanical2" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('Mechanical')"/>

      <div v-if="imagesMech.length > 0">
        <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesMechI">
          <q-carousel-slide v-for="i in imagesMechU" :key="i" :name="i" :img-src="i"/>
        </q-carousel>
      </div>

      <q-dialog v-model="deleterowmec" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
          <q-card-section>
            <div class="text-h6">Delete this Item</div>
          </q-card-section>

          <q-card-actions align="right" class="bg-blue-grey-9">
            <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removemechanical(deleteitem)"/>
            <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

     <div class="dtable" v-if="userzoningaccess">
       <input id="cameraZoning" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Land Use and Zoning" :data="zoningdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Land Use and Zoning</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addzoning = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallzoning" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(zoningdata, 'ZONING')"/>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'Zoning')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('Zoning')"/>

       <div v-if="imagesZoning.length > 0">
         <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesZoningI">
           <q-carousel-slide v-for="i in imagesZoningU" :key="i" :name="i" :img-src="i"/>
         </q-carousel>
       </div>

      <q-dialog v-model="deleterowzon" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
          <q-card-section>
            <div class="text-h6">Delete this Item</div>
          </q-card-section>

          <q-card-actions align="right" class="bg-blue-grey-9">
            <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removezoning(deleteitem)"/>
            <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

     <div class="dtable" v-if="userbfpaccess">
       <input id="cameraBFP" type="file" accept="image/*" capture="camera" hidden/>
      <br/>
      <q-table class="datatable" title="Findings for Land Use and Zoning" :data="bfpdata" :columns="columns" :table-style="{ backgroundColor: '#cfd8dc' }" flat hide-bottom>
          <template v-slot:top v-if="appid > 0">
            <label style="color: black  font-size:1rem">Findings for Bureau of Fire</label>
            <q-space />
            <q-btn flat dense color="secondary" :disable="loading" label="Add row" @click="addbfp = true" />
            <q-btn class="on-right mobilemode" flat dense color="red" :disable="loading" label="Clear All" @click="clearallbfp" />
            <q-btn class="on-right mobilemode" color="secondary" :disable="loading" label="Save" @click="saveBuilding2(bfpdata, 'BFP')"/>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" @click="props.selected = !props.selected" v-touch-swipe.mouse.right.left="handler(props.row.name, 'BFP')">
              <q-td key="description" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" title="Edit Data">
                  <q-input v-model="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
      </q-table>
      <q-btn class="on-right mobilemode2" color="secondary" :disable="loading" label="Save" />
      <q-btn class="on-right tab-mob" color="secondary" :disable="loading" label="Add Photo" icon="camera_alt" @click="gotoCamera('BFP')"/>

       <div v-if="imagesBFP.length > 0">
         <q-carousel swipeable arrows animated transition-next="slide-left" transition-prev="slide-right" thumbnails infinite v-model="imagesBFPI">
           <q-carousel-slide v-for="i in imagesBFPU" :key="i" :name="i" :img-src="i"/>
         </q-carousel>
       </div>

      <q-dialog v-model="deleterowbfp" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
          <q-card-section>
            <div class="text-h6">Delete this Item</div>
          </q-card-section>

          <q-card-actions align="right" class="bg-blue-grey-9">
            <q-btn flat class="text-green-5" label="Delete" v-close-popup @click="removebfp(deleteitem)"/>
            <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <q-dialog v-model="addrow">
      <q-card>
        <q-card-section dark style="background: #ffab40 ">
          <div class="text-h6">Add Findings</div>
        </q-card-section>
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          height="300px"
          class="bg-primary text-white shadow-1 rounded-borders"
        >
        <q-carousel-slide name="style" class="column no-wrap flex-center" style="background: #2979ff ">
          <label>Description</label>
          <q-input dark v-model="sdescription" :dense="dense" size="100px"/>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center wide">
          <label>Date Started</label>
          <q-input filled v-model="sdatestart" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="sdatestart" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <label>Date Ended</label>
          <q-input filled v-model="sdateend" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="sdateend" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-carousel-slide>
        </q-carousel>
        <q-card-section v-if="sdescription !== ''" style="background: #2979ff ">
          <q-btn unelevated class="dialogbutton" color="primary" label="Save" @click="addFinder"/>
        </q-card-section>
       </q-card>
    </q-dialog>
    <q-dialog v-model="addrow" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined class="bg-white" v-model="sdescription" :dense="dense"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addFinder"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbuildinglineandgrade" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Building Line and Grade</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBuildingLG"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBuildingLG"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addoccupancylineandgrade" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Occupancy Line and Grade</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addOccupancyLG"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addOccupancyLG"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbuildingarchitecture" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Building Architecture</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBuildingArch"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBuildingArch"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addoccupancyarchitecture" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Occupancy Architecture</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addOccupancyArch"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addOccupancyArch"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbuildingstructural" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Building Structural</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBuildingStruct"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBuildingStruct"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addoccupancystructural" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Occupancy Structural</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addOccupancyStruct"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addOccupancyStruct"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbuildingplumbing" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Building Sanitary/Plumbing</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBuildingPlum"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBuildingPlum"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addoccupancyplumbing" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Occupancy Sanitary/Plumbing</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addOccupancyPlum"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addOccupancyPlum"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbuildingelectrical" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Building Electrical</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBuildingElec"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBuildingElec"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addoccupancyelectrical" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Occupancy Electrical</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addOccupancyElec"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addOccupancyElec"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbuildingmechanical" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Building Mechanical</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBuildingMech"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBuildingMech"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addoccupancymechanical" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Occupancy Mechanical</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addOccupancyMech"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addOccupancyMech"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="addsignagerow" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Signage</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addSignage"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addSignage"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="addelectrical" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Electrical</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addElectrical"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addElectrical"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="addmechanical" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Mechanical</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addMechanical"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addMechanical"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addzoning" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Land Use and Zoning</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addZoning"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addZoning"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addbfp" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue-grey-3 text-blue-grey-10" style="width: 1200px ">
        <q-card-section>
          <div class="text-h6">Add Findings for Bureau of Fire</div>
        </q-card-section>

        <q-card-section>
          <q-input outlined autofocus class="bg-white" v-model="sdescription" :dense="dense" @keydown.enter="addBFP"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-blue-grey-9">
          <q-btn flat class="text-green-5" label="Add" v-close-popup @click="addBFP"/>
          <q-btn flat class="text-red-9" label="Cancel" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <br/><br/>

    <div class="saveArea" v-if="appid > 0">
      <q-btn unelevated class="savebutton" color="primary" icon="check" label="Save" @click="saveData" />
    </div>


    <q-dialog v-model="map" :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down" style="opactity: 0.5">
      <q-card class="bg-primary text-white" style="opacity: 0.9">

        <q-card-section>
          <div class="text-h6">OCBO Map</div>
        </q-card-section>

         <q-card-section>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.5305885202456!2d125.6059840142885!3d7.064307018600934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d78c7550851%3A0xc577efa1d368e43a!2sCITY%20ENGINEER&#39 S%20OFFICE!5e0!3m2!1sen!2sph!4v1570517118419!5m2!1sen!2sph" width="100%" height="450" frameborder="0" style="border:0 " allowfullscreen=""></iframe>
          </q-card-section>

        <q-card-section>
         <LeafletMap></LeafletMap>
        </q-card-section>

        <q-card-section class="row justify-center">
          <q-btn unelevated class="mapbutton" color="positive" label="OK" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>-->
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
// import Swal from 'sweetalert2'
// const l3s = require('../assets/js/L3S')
// const iips = require('../assets/js/functions')
import iLabel from 'components/iLabel.vue'

const quasar = useQuasar()

let dark = ref(false)
let appno = ref('')
let appid = ref(0)
let employeeid = ref(0)
let name = ref('')
let address = ref('')
let location = ref('')
let scope = ref('')
let typeoruse = ref('')
let loading = ref(false)
let addrow = ref(false)
let slide = ref('style')
let sdescription = ref('')
let sdatestart = ref('')
let sdateend = ref('')
let dense = ref(false)
let allowsave = ref(false)
let userdefaultaccess = ref(false)
let userbuildinglgaccess = ref(false)
let useroccupancylgaccess = ref(false)
let userbuildingarchaccess = ref(false)
let useroccupancyarchaccess = ref(false)
let userbuildingstructaccess = ref(false)
let useroccupancystructaccess = ref(false)
let userbuildingplumaccess = ref(false)
let useroccupancyplumaccess = ref(false)
let userbuildingelecaccess = ref(false)
let useroccupancyelecaccess = ref(false)
let userbuildingmechaccess = ref(false)
let useroccupancymechaccess = ref(false)
let userzoningaccess = ref(false)
let usersignageaccess = ref(false)
let userelectricalaccess = ref(false)
let usermechanicalaccess = ref(false)
let userbfpaccess = ref(false)

let addbuildinglineandgrade = ref(false)
let addoccupancylineandgrade = ref(false)
let addbuildingarchitecture = ref(false)
let addoccupancyarchitecture = ref(false)
let addbuildingstructural = ref(false)
let addoccupancystructural = ref(false)
let addbuildingplumbing = ref(false)
let addoccupancyplumbing = ref(false)
let addbuildingelectrical = ref(false)
let addoccupancyelectrical = ref(false)
let addbuildingmechanical = ref(false)
let addoccupancymechanical = ref(false)
let addzoning = ref(false)
let addsignagerow = ref(false)
let addbfp = ref(false)

let columns = ref([
  {
    name: 'description',
    required: true,
    label: 'Description',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  }
]);

let bldglgdata = ref([]);
let occlgdata = ref([]);
let bldgarchdata = ref([]);
let occarchdata = ref([]);
let bldgstructdata = ref([]);
let occstructdata = ref([]);
let bldgplumdata = ref([]);
let occplumdata = ref([]);
let bldgelecdata = ref([]);
let occelecdata = ref([]);
let bldgmechdata = ref([]);
let occmechdata = ref([]);
let zoningdata = ref([]);
let signdata = ref([]);
let elecdata = ref([]);
let mechdata = ref([]);
let bfpdata = ref([]);
let empdata = ref([]);
let map = ref(false);
let maximizedToggle = ref(true);
let geolocation = ref('');
let geoLat = ref('');
let geoLong = ref('');
let isDataEmpty = ref(true);
let okSaved = ref(false);
let savetable = ref([]);
let selected = ref([]);
let info = ref(null);
let deleterow = ref(false);
let deleteitem = ref('');
let deleterowblg = ref(false);
let deleterowolg = ref(false);
let deleterowbar = ref(false);
let deleterowoar = ref(false);
let deleterowbst = ref(false);
let deleterowost = ref(false);
let deleterowbpl = ref(false);
let deleterowopl = ref(false);
let deleterowbel = ref(false);
let deleterowoel = ref(false);
let deleterowbme = ref(false);
let deleterowome = ref(false);
let deleterowsig = ref(false);
let deleterowele = ref(false);
let deleterowmec = ref(false);
let deleterowzon = ref(false);
let deleterowbfp = ref(false);
let dateStart = ref('');
let signageallowadd = ref(true);
let selectedicon = ref('Please Select a Type');
let savedicon = ref(null);
let saveType = ref('')
let savedTypeBool = ref(true);

let savedbldgLG = ref(0)
let savedbldgLGMsg = ref('')
let savedbldgArch = ref(0)
let savedbldgStruct = ref(0)
let savedbldgStructMsg = ref('')
let savedbldgPlum = ref(0)
let savedbldgPlumMsg = ref('')
let savedbldgElec = ref(0)
let savedbldgElecMsg = ref('')
let savedbldgMech = ref(0)
let savedbldgMechMsg = ref('')
let savedbldgZoning = ref(0)
let savedbldgZoningMsg = ref('')
let savedbldgBFP = ref(0)
let savedbldgBFPMsg = ref('')

let savedoccLG = ref(0)
let savedoccLGMsg = ref(null)
let savedoccArch = ref(0)
let savedoccStruct = ref(0)
let savedoccStructMsg = ref(null)
let savedoccPlum = ref(0)
let savedoccPlumMsg = ref(null)
let savedoccElec = ref(0)
let savedoccElecMsg = ref(null)
let savedoccMech = ref(0)
let savedoccMechMsg = ref(null)
let savedoccZoning = ref(0)
let savedoccZoningMsg = ref(null)
let savedoccBFP = ref(0)
let savedoccBFPMsg = ref(null)

let savedSignage = ref(0)
let savedSignageMsg = ref(null)

let savedElectrical = ref(0)
let savedElectricalMsg = ref(null)

let savedMechanical = ref(0)
let savedMechanicalMsg = ref(null)

let selectedType = ref('Please Select a Type')
// let images = ref([])
// let image = ref(1)
// let imagesUnique = ref([])
let showTypeofConstruction = ref(false)
let imagesBldgLG = ref([])
let imagesOccLG = ref([])
let imagesBldgArch = ref([])
let imagesOccArch = ref([])
let imagesBldgStruct = ref([])
let imagesOccStruct = ref([])
let imagesBldgPlum = ref([])
let imagesOccPlum = ref([])
let imagesBldgElec = ref([])
let imagesOccElec = ref([])
let imagesBldgMech = ref([])
let imagesOccMech = ref([])
let imagesSign = ref([])
let imagesElec = ref([])
let imagesMech = ref([])
let imagesZoning = ref([])
let imagesBFP = ref([])

let imagesBldgLGU = ref([])
let imagesOccLGU = ref([])
let imagesBldgArchU = ref([])
let imagesOccArchU = ref([])
let imagesBldgStructU = ref([])
let imagesOccStructU = ref([])
let imagesBldgPlumU = ref([])
let imagesOccPlumU = ref([])
let imagesBldgElecU = ref([])
let imagesOccElecU = ref([])
let imagesBldgMechU = ref([])
let imagesOccMechU = ref([])
let imagesSignU = ref([])
let imagesElecU = ref([])
let imagesMechU = ref([])
let imagesZoningU = ref([])
let imagesBFPU = ref([])

let imagesBldgLGI = ref(1)
let imagesOccLGI = ref(1)
let imagesBldgArchI = ref(1)
let imagesOccArchI = ref(1)
let imagesBldgStructI = ref(1)
let imagesOccStructI = ref(1)
let imagesBldgPlumI = ref(1)
let imagesOccPlumI = ref(1)
let imagesBldgElecI = ref(1)
let imagesOccElecI = ref(1)
let imagesBldgMechI = ref(1)
let imagesOccMechI = ref(1)
let imagesSignI = ref(1)
let imagesElecI = ref(1)
let imagesMechI = ref(1)
let imagesZoningI = ref(1)
let imagesBFPI = ref(1)

const checkSavedDropdown = () => {
  if (savedType.value !== '') {
    if (selectedType.value !== savedType.value) {
      savedTypeBool.value = true
    } else {
      savedTypeBool.value = false
    }
  }
}

const checkDark = () => {
  if (quasar.sessionStorage.has('dark') === true) {
    dark.value = true
  } else {
    dark.value = false
  }
}

(() => {
  checkDark()
})()
</script>

<style lang="sass" scoped>

.grid-container
  display: grid
  grid-template-columns: 1fr 0fr 4fr 1fr
  grid-template-rows: 1fr
  grid-template-areas: "searchbar searchcircle . logout"

.searchbar
  grid-area: searchbar
  width: 25rem
  font-size: 1.8em

.searchcircle
  grid-area: searchcircle
  margin-top: 9px

.logout
  grid-area: logout
  /* width: 40%  */
  width: 200px
  height: 40px
  margin-top: 9px

.details
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: 1fr 1fr 1fr
  grid-template-areas: "ownername ownername" "address location" "scope typeoruse"
.ownername
  grid-area: ownername

.address
  grid-area: address
  width: 630px

.location
  grid-area: location
  width: 100%

.scope
  grid-area: scope
  width: 630px

.typeoruse
  grid-area: typeoruse
  width: 100%

.typeofcon
  grid-area: typeofcon
  margin-bottom: 30px

.dtable
   width:100%

.q-input-target
  text-align: center

.workArea
  align-items: center
  align-content: center
  background-size: 100%
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: flex-start
  height: 100%

.page
  width: 100%
  height: 100%
  min-width: 100%
  min-height: 100%
  position: relative

.page::before
  background-image: url("../assets/bg.svg")
  /* background-image: url("..\statics\background-ling2.jpg")  */
  background-color: lightslategray
  background-blend-mode: multiply
  background-size: cover
  content: ""
  display: block
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: -2
  opacity: 0.9

// .page--dark
//   width: 100%
//   height: 100%
//   min-width: 100%
//   min-height: 100%
//   position: relative

.page--dark::before
  background-image: url("../assets/bg.svg")
  background-color: rgb(28, 28, 29)
  background-blend-mode: multiply
  background-size: cover
  content: ""
  display: block
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: -2
  opacity: 0.9


label
  font-size: 1.2em
  /* color: #1a237e  */
  color: #ffffff


// /* .datatable {
//   /* font-size: 12px
// } */

.datatable .q-table__middle
  max-height: 200px


.datatable .q-table__top,
.datatable .q-table__bottom,
.datatable thead tr:first-child th
  /* background-color: #283593  */
  background-color: #cfd8dc


.datatable thead tr:first-child th
  position: sticky
  top: 0
  opacity: 1
  z-index: 1

.dialogbutton
  display: block
  color: grey
  font-size: 1rem
  background: #2979ff
  float: right

.saveArea
  display: grid
  grid-template-columns: 8fr 1fr
  grid-template-rows: 1fr
  grid-template-areas: ". button"

.savebutton
  grid-area: button


// /* #map {
//   height: 100%
// } */

.mapbutton
  width: 8em

.mobilemode2
  display: none

.tab-mob
  display: none


@media screen and (max-width: 507px)
  .grid-container
    display: grid
    grid-template-columns: 1fr 0fr 1fr
    grid-template-rows: 1fr
    grid-template-areas: "searchbar searchcircle logout"

  .searchbar
    grid-area: searchbar
    width: 15rem
    font-size: 1.8em

  .searchcircle
    grid-area: searchcircle
    margin-top: 9px

  .logout
    grid-area: logout
    /* width: 40%  */
    width: 100%
    height: 40px
    margin-top: 9px

  .details
    display: grid
    grid-template-columns: 1fr
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr
    grid-template-areas: "ownername" "address" "location" "scope" "typeoruse"

  .ownername
    width: 100%

  .address
    width: 100%

  .location
    width: 100%

  .scope
    width: 100%

  .typeoruse
    width: 100%

  .saveArea
    display: grid
    grid-template-columns: 1fr
    grid-template-rows: 1fr
    grid-template-areas: "button"

  .savebutton
    grid-area: button
    height: 50px

  .mobilemode
    display: none

  .mobilemode2
    display: inherit
    width: 100%
    height: 40px
    margin: 0

  .tab-mob
    display: inherit
    width: 100%
    height: 40px
    margin: 0

@media screen and (max-width: 1080px) and (min-width: 508px)
  .grid-container
    display: grid
    grid-template-columns: 1fr 0fr 2fr 1fr
    grid-template-rows: 1fr
    grid-template-areas: "searchbar searchcircle . logout"

  .details
    display: grid
    grid-template-columns: 1fr
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr
    grid-template-areas: "ownername" "address" "location" "scope" "typeoruse"

  .ownername
    grid-area: ownername
    width: 100%

  .address
    grid-area: address
    width: 100%

  .location
    grid-area: location
    width: 100%

  .scope
    grid-area: scope
    width: 100%

  .typeoruse
    grid-area: typeoruse
    width: 100%

  .saveArea
    display: grid
    grid-template-columns: 3fr 1fr
    grid-template-rows: 1fr
    grid-template-areas: ". button"

  .savebutton
    grid-area: button
    height: 40px
    width: 190px

  .tab-mob
    display: inherit
    width: 100%
    height: 40px
    margin: 0
</style>
