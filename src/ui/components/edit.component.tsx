import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {resources, sanctuary, talents} from "../util/names";
import $ from 'jquery';
import {FaMagic} from "react-icons/fa";
import {FaHatWizard} from "react-icons/fa";
import {MdOutlineInventory2} from "react-icons/md";

const Knuts = "Knuts";


export const EditComponent = () => {
  const navigate = useNavigate()
  const {register, handleSubmit, reset, watch, setValue, getValues} = useForm();
  const [data, setData] = useState<any>({})
  const [selectedTab, setSelectedTab] = useState<'player' | 'inventory' | 'talents'>('player')
  //const [selectedInventoryTab, setSelectedInventoryTab] = useState<'resources' | 'sanctuary' | 'mission'>('resources')

  useEffect(() => {
    window.HLSE.getData().then(data => {
      setData(data)
      reset(data.player)
    })
  }, [])

  const handleBackClick = () => {
    navigate('/', {replace: true})
  }

  const handleImportDatabaseClick = async () => {
    await window.HLSE.importDatabase()
    window.HLSE.getData().then(data => {
      setData(data)
      reset(data.player)
    })
  }

  const handleExportDatabaseClick = async () => {
    await window.HLSE.exportDatabase()
  }

  const handleUnlockAllClick = async () => {
    talents.forEach(item => {
      setValue(`talents.${item.key}`, true)
    })
  }

  const handleRespecClick = async () => {
    let allocatedPoints = 0

    talents.forEach(item => {
      allocatedPoints += getValues(`talents.${item.key}`) ? 1 : 0
      setValue(`talents.${item.key}`, false)
    })

    setValue('misc.PerkPoints', parseInt(getValues('misc.PerkPoints'), 10) + allocatedPoints)
  }

  const onFormSubmit = async (values: unknown) => {
    console.log(values)
    const success = await window.HLSE.setData(values)

    if (success) {
      await window.HLSE.writeSave()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  $(".btm-nav button").on("click", function () {
    $(".btm-nav button").removeClass("active");
    $(this).addClass("active");
    setSelectedTab($(this).data("select"));
  });

  return (
    <>
      <div className="navbar bg-base-200 text-primary-content">
        <div className="navbar-start">
          <div className="flex space-x-4">
            <button
              className="btn btn-outline btn-primary"
              onClick={handleImportDatabaseClick}>
              Import Database
            </button>
            <button
              className="btn btn-outline btn-secondary"
              onClick={handleImportDatabaseClick}>
              Download Database
            </button>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">
            <span className="text-white">h</span>
            <span className="text-primary">HLSE</span>
          </a>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-outline btn-secondary"
            onClick={onFormSubmit}>
            Save File
          </button>
        </div>
      </div>
      {selectedTab === 'player' && (
        <section className="h-screen bg-base-300">
          <div className="flex justify-center items-center h-[80vh]">
            <form className="container max-w-5xl h-max mx-auto shadow-md md:w-3/4">
              <div className="p-4 border-t-2 border-primary bg-base-100 rounded-t-lg">
                <div className="max-w-sm m-auto md:mx-25">
                  <div className="relative flex justify-center space-x-4 leading-5">
                    <p id="lol" className="text-center card-title text-gray-200">
                      Player
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6 bg-base-100 rounded-b-lg">
                <hr className="h-1 mx-12 bg-gray-100 border-0 rounded dark:bg-gray-700"/>
                <div className="items-center w-full p-4 space-y-4 text-gray-200 md:inline-flex md:space-y-0">
                  <div className="max-w-sm mx-auto space-y-9 md:w-1/2">
                    <div className="relative">
                      <h2>First Name</h2>
                    </div>
                    <div className="relative">
                      <h2>Last Name</h2>
                    </div>
                    <div className="relative">
                      <h2>Experience</h2>
                    </div>
                    <div className="relative">
                      <h2>Inventory Capacity</h2>
                    </div>
                  </div>
                  <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                    <div className="relative">
                      <input type="text" id="first-name"
                             className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-base-300 text-white placeholder-white shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                             {...register('misc.PlayerFirstName')}/>
                    </div>
                    <div className="relative">
                      <input type="text" id="last-name"
                             className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-base-300 text-white placeholder-white shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                             {...register('misc.PlayerLastName')}/>
                    </div>
                    <div className="relative">
                      <input type="text" id="user-info-name"
                             className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-base-300 text-white placeholder-white shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                             {...register('misc.ExperiencePoints')}/>
                    </div>
                    <div className="relative">
                      <input type="text" id="user-info-phone"
                             className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-base-300 text-white placeholder-white shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                             {...register('misc.BaseInventoryCapacity')}/>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-3/3">
                  <button type="submit"
                          className="py-2 px-4 bg-primary hover:bg-primary-focus focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}

      {selectedTab === 'inventory' && (
        <section className="h-screen bg-base-300">
          <div className="flex justify-center items-center h-[80vh]">
            <form className="container max-w-5xl h-full pt-2 shadow-md md:w-3/4">
              <div className="p-4 border-t-2 border-primary bg-base-100 rounded-t-lg">
                <div className="max-w-sm m-auto md:mx-25">
                  <div className="relative flex justify-center space-x-4 leading-5">
                    <p className="text-center card-title text-gray-200">
                      Inventory
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6 bg-base-100 rounded-b-lg h-full">
                <hr className="h-1 mx-12 border-0 rounded-lg bg-gray-700"/>
                <div className="flex justify-center items-center">
                  <div className="items-center w-full p-4 space-y-4 text-gray-200 md:inline-flex md:space-y-0">
                    <div className="w-full px-4 pb-4 ml-0 md:w-2/4">
                      <div className="form-control">
                        <span className="text-center mb-4">Galleons</span>
                        <input type="number"
                               className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-base-300 text-white placeholder-white shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                               {...register('inventory.resources.amount.Knuts')}/>
                      </div>
                    </div>
                    <div className="w-full px-4 pb-4 ml-0 md:w-2/4">
                      <div className="form-control">
                        <span className="text-center mb-4">Wiggenweld Potions</span>
                        <input type="number"
                               className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-base-300 text-white placeholder-white shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                               {...register('inventory.health.WoundCleaning')}/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative border-t-2 border-secondary bg-base-100 shadow-[0px_0px_20px_22px_#00000024] mx-4 rounded-lg">
                  <table className="w-full text-sm text-left text-gray-400 max-h-screen">
                    <tbody className="flex flex-col overflow-y-scroll rounded-t-lg justify-between w-full h-[37rem]">
                    {resources.map((item) => {
                      if (register(`inventory.resources.amount.${item.key}`)) {
                        return (
                          <>
                            <tr className="flex w-full mb-4">
                              <td
                                className="w-1/2 pb-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.value}
                              </td>


                              <td className="w-1/2 px-6 py-4">
                                <input
                                  data-for={item.value}
                                  type="string"
                                  className="border border-d border-primary rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-4 px-4 bg-base-300 text-white placeholder-white shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  {...register(`inventory.resources.amount.${item.key}`)}/>
                              </td>
                            </tr>
                          </>
                        );
                      } else {
                        return (
                          <>
                          </>
                        );
                      }
                    })}
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
      <div className="flex min-h-screen items-center justify-center bg-base-100">
        <div className="btm-nav">
          <button data-select="inventory">
            <MdOutlineInventory2/>
            <span className="btm-nav-label">Inventory</span>
          </button>
          <button data-select="player" className="active">
            <FaHatWizard/>
            <span className="btm-nav-label">Player</span>
          </button>
          <button data-select="talents">
            <FaMagic/>
            <span className="btm-nav-label">Talents</span>
          </button>
        </div>
      </div>
    </>
    /*
      <Pane height='100%' display='flex' flexDirection='column'>
        <Pane height={48} display='flex' alignItems='center' padding={8} background='edit-save#222'>
          <IconButton icon={<ArrowLeftIcon/>} appearance='minimal' onClick={handleBackClick}/>
          <Text flex={1} paddingLeft={8} paddingRight={8} color='#fff'>Editing {data.saveName}</Text>
          <Popover content={({close}) => (
            <Menu>
              <Menu.Group>
                <Menu.Item icon={<ImportIcon/>} onClick={() => {
                  close()
                  handleImportDatabaseClick()
                }}>Import Database</Menu.Item>
                <Menu.Item icon={<ExportIcon/>} onClick={() => {
                  close()
                  handleExportDatabaseClick()
                }}>Export Database</Menu.Item>
              </Menu.Group>
            </Menu>
          )}>
            <IconButton icon={<CogIcon/>} appearance='minimal'/>
          </Popover>
        </Pane>
        <Pane display='flex' alignItems='center' padding={8} background='gray400'>
          <Tablist>
            <Tab isSelected={selectedTab === 'player'} onSelect={() => setSelectedTab('player')}>Player</Tab>
            <Tab isSelected={selectedTab === 'inventory'} onSelect={() => setSelectedTab('inventory')}>Inventory</Tab>
            <Tab isSelected={selectedTab === 'talents'} onSelect={() => setSelectedTab('talents')}>Talents</Tab>
          </Tablist>
        </Pane>
        <Pane minHeight={0} flex={1} padding={16} background='gray100'>
          <Pane aria-hidden={selectedTab !== 'player'} display={selectedTab === 'player' ? 'block' : 'none'} key='player'
                role='tabpanel'>
            <Pane display='grid' width='100%' gridTemplateColumns='repeat(2, 1fr)' gap='0 16px'>
              <TextInputField label='First Name' {...register('misc.PlayerFirstName')} />
              <TextInputField label='Last Name' {...register('misc.PlayerLastName')} />
              <TextInputField type='number' label='Experience' {...register('misc.ExperiencePoints')} />
              <TextInputField type='number' label='Inventory Capacity' {...register('misc.BaseInventoryCapacity')} />
            </Pane>
          </Pane>
          <Pane height='100%' aria-hidden={selectedTab !== 'inventory'}
                display={selectedTab === 'inventory' ? 'block' : 'none'} key='inventory' role='tabpanel'>
            <Pane height='100%' display='flex' flexDirection='column'>
              <Pane display='flex' width='100%' gap={16}>
                <TextInputField flex={1} type='number' label='Galleons' min={0}
                                max={999999} {...register('inventory.resources.Knuts')} />
                <TextInputField flex={1} type='number' label='' min={0}
                                max={25} {...register('inventory.health.WoundCleaning')} />
              </Pane>
              <Pane display='flex' width='100%' gap={16} marginBottom={8}>
                <Pane flex={1}>
                  <Text fontWeight={500} color='dark'>Resources</Text>
                </Pane>
                <Pane flex={1}>
                  <Text fontWeight={500} color='dark'>Sanct uary Wheel</Text>
                </Pane>
              </Pane>
              <Pane minHeight={0} display='flex' flexDirection='column' flex={1}>
                <Pane height='100%' display='flex' gap={16}>
                  <Pane flex={1} overflowY='auto'>
                    <Table>
                      <Table.Body>
                        {resources.map((item: typeof resources[number]) => (
                          <Table.Row key={item.key} height={48}>
                            <Table.TextCell>{item.value}</Table.TextCell>
                            <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}>
                              <TextInput type='number' min={0} max={9999}
                                         width={72} {...register(`inventory.resources.${item.key}`)} />
                            </Table.TextCell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Pane>
                  <Pane flex={1} overflowY='auto'>
                    <Table>
                      <Table.Body>
                        {sanctuary.map((item: typeof sanctuary[number]) => (
                          <Table.Row key={item.key} height={48}>
                            <Table.TextCell>{item.value}</Table.TextCell>
                            <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}>
                              <TextInput type='number' min={0} max={9999}
                                         width={72} {...register(`inventory.sanctuary.${item.key}`)} />
                            </Table.TextCell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Pane>
                </Pane>
              </Pane>
            </Pane>
          </Pane>
          <Pane height='100%' aria-hidden={selectedTab !== 'talents'} display={selectedTab === 'talents' ? 'block' : 'none'}
                key='talents' role='tabpanel'>
            <Pane height='100%' display='flex' flexDirection='column'>
              <Pane display='flex' width='100%' gap={16}>
                <TextInputField flex={1} type='number' label='Talent Points' {...register('misc.PerkPoints')} />
                <Pane flex={1} display='flex' alignItems='center' gap={16}>
                  <Button flex={1} onClick={handleUnlockAllClick}>Unlock All</Button>
                  <Button flex={1} onClick={handleRespecClick}>Respec</Button>
                </Pane>
              </Pane>
              <Pane display='flex' width='100%' gap={16} marginBottom={8}>
                <Pane flex={1}>
                  <Text fontWeight={500} color='dark'>Talents</Text>
                </Pane>
              </Pane>
              <Pane minHeight={0} display='flex' flexDirection='column' flex={1}>
                <Pane height='100%' display='flex' gap={16}>
                  <Pane flex={1} overflowY='auto'>
                    <Table>
                      <Table.Body>
                        {talents.map((item: typeof talents[number]) => (
                          <Table.Row key={item.key} height={48}>
                            <Table.TextCell>{item.value}</Table.TextCell>
                            <Table.TextCell paddingLeft={32} flexBasis={100} flexShrink={0} flexGrow={0}>
                              <Switch
                                {...register(`talents.${item.key}`)}
                                checked={watch(`talents.${item.key}`)}
                                onChange={e => setValue(`talents.${item.key}`, e.target.checked)}/>
                            </Table.TextCell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Pane>
                </Pane>
              </Pane>
            </Pane>
          </Pane>
        </Pane>
        <Pane height={48} display='flex' alignItems='center' justifyContent='flex-end' padding={8}
              background='edit-save#222'>
          <Button appearance='primary' intent='success' onClick={handleSubmit(onFormSubmit)}>Save</Button>
        </Pane>
      </Pane>
    */
  )
}
