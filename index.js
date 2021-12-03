const bodyParser = require('body-parser')
const express = require ('express')
const mongoose = require('mongoose')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public/'))
//--- cabeceras
//// cabeceras
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    next();
  });


//--------conect 
mongoose.connect('mongodb://127.0.0.1:27017/ella',{useNewUrlParser:true,useUnifiedTopology:true})
const conexion= mongoose.connection
conexion.once('open',()=>{
      console.log("chido")
})
conexion.once('error',(err)=>{
    console.log(' no chido', err.message)
})
///-------------------------------------------------------------Esquemas-------------------------------
const UsuarioEsquem = new mongoose.Schema({
    nombre:String,
    apepat:String,
    apemat:String,
    edad:Number,
    usuario:String,
    pass:String,
    cumple:Date,
    domicilio:{
        tipo:Number,
        calle:String,
        numero:Number,
        colonia:String,
        cp:Number,
        municipio:String,
        estado:String,
        pais:String
    },
    contacto:[

    ],
    tipo:Number
})
const AnticonceptivosEsquema = mongoose.Schema({
    metodo:String,
    fechainicio:Date,
    efectividad:Number,
    efectos:[],
    _idpaciente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usuario"
    }
})
const LaboratoriosEsquema = mongoose.Schema({
    nombre:String,
    contacto:{
        tel:Number
    },
    horario:String,
    domicilio:{
        tipo:Number,
        calle:String,
        numero:Number,
        colonia:String,
        cp:Number,
        municipio:String,
        estado:String,
        pais:String
    }

})
const AnalisisEsquema = mongoose.Schema({
    estudio:[
        {
            fechaToma:Date,
            nombrestudio:String,
            resultado:Number,
            variacion:Number,
            variacion2:Number
        }
    ],
    _idpaciente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usuario"
    },
    _idlaboratorio:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"laboratorios"
    }
})
 const AntecedentesEsquema = mongoose.Schema({
    _idpaciente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usuario"
    },
    afecciones:[
        {
        fechainicio:Date,
        tipo:String
       }
    ],
    medicamentos:[],
    habitos:[],
    antecedentes:[
        {
        parentezco:String,
        enfermedad:String,
        edad:Number
        }
    ],
    relaciones:{
        ultimafecha:Date,
        nparejas:Number,
        frecuencia:String
    },
    embarazo:[
        {
        aliviofecha:Date,
        sexo:String,
        complicaciones:[]
       }
    ],
    aborto:[
        {
        abortofecha:Date,
        causa:String
        }
   ]
 }) 
 const CicloEsquema = mongoose.Schema({
    _idpaciente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usuario"
    },
    cicloa:{
        fechainicio:Date,
        fechafin:Date,
        duracioni:Number
        },
    cicloh:[
        {
            
        }
    ],
    variacion:Number,
    duracion:Number
})
 const ConsultasEsquema = mongoose.Schema({
    _idpaciente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usuario"
    },
    consulta:{
        fecha:Date,
        hora:String,
        peso:Number
    },
    consultah:[
        {

        }
    ]
})
 const ExpedienteEsquema = mongoose.Schema({
    _idpaciente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usuario"
    },
    alergias:[
        {
            sintomas:[],
            causa:String,
            complicacion:String
        }
    ],
    tiposangre:String,
    Altura:Number,
    peso:Number,
    Genero:String,
    _iddoctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usuario"
    }
})
 const MedicamentosEsquema = mongoose.Schema({
    _idpaciente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usuario"
    },
    nombre:String,
    dosis:{
        cantidad:Number,
        frecuencia:String
    },
    fechainicio:Date,
    fechafin:Date,
    efectos:[],
    notas:[]
})
 const QuisteEsquema = mongoose.Schema({
    lugar:String,
    datos:[
      {
        tam:Number,
        fecha:Date
      }
   ],
    cancer:String,
    removido:String,
    _idpaciente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usuario"
    }
})
 const SintomasEsquema = mongoose.Schema({
    _idpaciente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usuario"
    },
    sintoma:String,
    frecuencia:String,
    duracion:String,
    intensidad:String
})
///-------------------------------------------------------------Modelos--------------------------------
const Analisis= mongoose.model('analisis',AnalisisEsquema,'analisis')
const Antecedentes= mongoose.model('antecedentes',AntecedentesEsquema,'antecedentes')
const Anticonceptivos= mongoose.model('anticonceptivo',AnticonceptivosEsquema,'anticonceptivo')
const Ciclo= mongoose.model('ciclo',CicloEsquema,'ciclo')
const Consultas= mongoose.model('consultas',ConsultasEsquema,'consultas')
const Expediente= mongoose.model('expediente',ExpedienteEsquema,'expediente')
const Laboratorios= mongoose.model('laboratorios',LaboratoriosEsquema,'laboratorios')
const Medicamentos= mongoose.model('medicamentos',MedicamentosEsquema,'medicamentos')
const Quiste= mongoose.model('quiste',QuisteEsquema,'quiste')
const Sintomas= mongoose.model('sintomas',SintomasEsquema,'sintomas')
const Usuario= mongoose.model('usuario',UsuarioEsquem,'usuario')
///-------------------------------------------------------------Joins---------------------------------
/*Anticonceptivos.find( { _idpaciente: "619c0456e554c19259f928e7" })
.populate("_idpaciente")
.then(p=>console.log(p))
.catch(error=>console.log(error))

Analisis.find()
.populate("_idpaciente").populate("_idlaboratorio")
.then(p=>console.log(p))
.catch(error=>console.log(error))

Antecedentes.find()
.populate("_idpaciente")
.then(p=>console.log(p))
.catch(error=>console.log(error))*/
//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------------------------usuario
app.get('/find',(req,res)=>{
    Usuario.find({},{})
    .then(doc=>{
        res.json({data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//---- usuario perfil 
app.get('/find/uno/:_idpaciente',(req,res)=>{
     var id = req.params._idpaciente
    Usuario.find({_id:id},{_id:0})
    .then(doc=>{
        res.json({data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----usuario borrar uno
app.get('/delete/:_idpaciente',(req,res)=>{
    const id= req.params._idpaciente
    Usuario.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta U', err.message)
     })
    //------- borra los analisis del usuario
    Analisis.deleteMany({_idpaciente:id})
    .then(doc=>{
        res.json({response:'succes eliminado de analisis'})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
    //------ borrar los antecedentes
    Antecedentes.deleteMany({_idpaciente:id})
    .then(doc=>{
        res.json({response:'succes eliminado de antecedentes'})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
    //------- borra los anticonceptivos
    Anticonceptivos.deleteMany({_idpaciente:id})
    .then(doc=>{
        res.json({response:'succes eliminado',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
    ///----------- borra los ciclos
    Ciclo.deleteMany({_idpaciente:id})
    .then(doc=>{
        res.json({response:'succes eliminado',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
    ///----------- borra las consultas
    Consultas.deleteMany({_idpaciente:id})
    .then(doc=>{
        res.json({response:'succes eliminado',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
    ///----------- borra el expediente
    Expediente.deleteMany({_idpaciente:id})
    .then(doc=>{
        res.json({response:'succes eliminado',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
    ///----------- elimina los quistes
    Quiste.deleteMany({_idpaciente:id})
    .then(doc=>{
        res.json({response:'succes eliminado',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
    ///----------- borra los sintomas
    Sintomas.deleteMany({_idpaciente:id})
    .then(doc=>{
        res.json({response:'succes eliminado',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
    ///----------- borra los medicamentos
    Medicamentos.deleteMany({_idpaciente:id})
    .then(doc=>{
        res.json({response:'succes eliminado',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
 })
 //----usuario meter nuevos usuarios
app.post('/insert',(req,res)=>{
    const user= new Usuario({cumple:req.body.cumple,nombre:req.body.nombre,apepat:req.body.apepat,apemat:req.body.apemat,edad:req.body.edad,usuario:req.body.usuario,pass:req.body.pass,tipo:req.body.tipo,domicilio:{calle:req.body.calle,numero:req.body.numero,colonia:req.body.colonia,cp:req.body.cp,municipio:req.body.municipio,estado:req.body.estado,pais:req.body.pais},contacto:[req.body.contacto],tipo:req.body.tipo})
    user.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//---- usuario actualizar (no documentos ni arrays)
app.put('/update/:_idpaciente',(req,res)=>{
    var id = req.params._idpaciente
    let update = req.body
   Usuario.findByIdAndUpdate(id , update)
   .then(doc=>{
       res.json({response:'succes',data:doc})
   })
   .catch(err=>{
       console.log(' error en la consulta', err.message)
   })
})
//---- usuario actualizar (no documentos ni arrays)
app.put('/update/domicilio/:_idpaciente',(req,res)=>{
    var id = req.params._idpaciente
   Usuario.find()
   .then(doc=>{
       res.json({response:'succes',data:doc})
   })
   .catch(err=>{
       console.log(' error en la consulta', err.message)
   })
})
//------ Mete otro numero de telefeno
//------- edita la direccion

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------------------------EXpediente
//----expediente
app.get('/findEX/:_id',(req,res)=>{
    Expediente.find({_id:req.params._id},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//--- busqueda por paciente
app.get('/findEX/uno/:_idpaciente',(req,res)=>{
    Expediente.find({_idpaciente:req.params._idpaciente},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----- busqueda por doctor 
app.get('/findEX/dos/:_iddoctor',(req,res)=>{
   /* Expediente.find({_iddoctor:req.params._iddoctor},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })*/
    Expediente.find({_iddoctor: req.params._iddoctor})
    .populate("_iddoctor").populate("_idpaciente")
    .then(doc=>{
        res.json({data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
   // .then(p=>console.log(p))
    //.catch(error=>console.log(error))
})
//---- nuevo expediente
//----Expediente
app.post('/insertEX',(req,res)=>{
    const exp = new Expediente({_idpaciente:req.body._idpaciente,alergias:[ { sintomas: [req.body.alergias[0].sintomas ], causa:req.body.alergias[0].causa,complicacion:req.body.alergias[0].complicacion } ],tiposangre:req.body.tiposangre,Altura:req.body.Altura,peso:req.body.peso,Genero:req.body.Genero,_iddoctor:req.body._iddoctor})
    exp.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//---- borrar el expediente
app.get('/deleteEX/:id',(req,res)=>{
    const id= req.params.id
    Expediente.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 //---- actualizar un expediente
 app.put('/updateEX/:id',(req,res)=>{
    const id= req.params.id
    let update = req.body
    Expediente.findByIdAndUpdate(id,update)
     .then(doc=>{
         res.json({response:'succes Actualizado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 app.put('/updateEX/alergia/:id',(req,res)=>{
    const id= req.params.id
    console.log(id)
    console.log(req.body.sintomas)
    Expediente.updateOne({_id:id},{$push:{alergias:{sintomas:req.body.sintomas,causa:req.body.causa,complicacion:req.body.complicacion}}})
     .then(doc=>{
         res.json({response:'succes Actualizado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
//-------mostrar pacientes segun el doctor
/*
   {_iddoctor: "6194874ee92a61d2a8fea18e"}
*/



/*Analisis.find()
.populate("_idpaciente").populate("_idlaboratorio")
.then(p=>console.log(p))
.catch(error=>console.log(error))*/

/*
app.get('/joinEX/:id',(req,res)=>{
    const id= req.params.id
    Expediente.find({_iddoctor:id})
    .populate("_idpaciente").populate("_iddoctor")
    .then(p=>console.log(p))
    .catch(error=>console.log(error))

    Expediente.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })*/




//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------ Consultas
//----consultas
app.get('/findCO/uno/:_idpaciente',(req,res)=>{
    Consultas.find({_idpaciente:req.params._idpaciente},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Consultas eliminar
app.get('/deleteCO/:id',(req,res)=>{
    const id= req.params.id
    Consultas.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
//----Consultas nueva
app.post('/insertCO',(req,res)=>{
    const consulta= new Consultas({_idpaciente:req.body._idpaciente,consulta:{fecha:req.body.fecha,hora:req.body.hora,peso:req.body.peso},})
    consulta.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//------------ mandar una consulta al historial
//------------- meter una nueva consulta al array



//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------ Medicamentos
//----medicamentos
app.get('/findME/uno/:_idpaciente',(req,res)=>{
    Medicamentos.find({_idpaciente:req.params._idpaciente})
    .then(doc=>{
        res.json({data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Medicamentos nuevos
app.post('/insertME',(req,res)=>{
    const medi= new Medicamentos({_idpaciente:req.body._idpaciente,nombre:req.body.nombre,dosis:{cantidad:req.body.dosis.cantidad,frecuencia:req.body.dosis.frecuencia},fechainicio:req.body.fechainicio,fechafin:req.body.fechafin,efectos:[req.body.efectos],notas:[req.body.notas]})
    medi.save()
    .then(doc=>{
        //console.log("Info: "+req.body)
        console.log('infor insertada')
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Medicamentos eliminar
app.get('/deleteME/:id',(req,res)=>{
    const id= req.params.id
    Medicamentos.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 //---- update dosis

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------ Sintomas
//----sintomas 
app.get('/findSI/uno/:_idpaciente',(req,res)=>{
    Sintomas.find({_idpaciente:req.params._idpaciente},{_id:0})
    .then(doc=>{
        res.json({data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Sintomas nuevos
app.post('/insertSI',(req,res)=>{
    const sintoma= new Sintomas({_idpaciente:req.body._idpaciente,sintoma:req.body.sintoma,frecuencia:req.body.frecuencia,duracion:req.body.frecuencia,intensidad:req.body.intensidad})
    sintoma.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Sintomas eliminar 
app.get('/deleteSI/:id',(req,res)=>{
    const id= req.params.id
    Sintomas.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })



//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------ Ciclo 
//----ciclomenstrual
app.get('/findCM/uno/:_idpaciente',(req,res)=>{
    Ciclo.find({_idpaciente:req.params._idpaciente},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//---- Ciclo alta
app.post('/insertCM',(req,res)=>{
    const regla= new Ciclo ({_idpaciente:req.body._idpaciente,cicloa:[{fechainicio:req.body.fechainicio,fechafin:req.body.fechafin}]})
    regla.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//------ pasar el ciclo al historial
//-------- meter un nuevo ciclo 
//----- update variacion
//---- update duracion 

 //----Ciclo eliminar 
 app.get('/deleteCM/:id',(req,res)=>{
    const id= req.params.id
    Ciclo.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })



//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------ Quiste
//----quiste
app.get('/findQ/uno/:_idpaciente',(req,res)=>{
    Quiste.find({_idpaciente:req.params._idpaciente},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Quiste nuevo
app.post('/insertQ',(req,res)=>{
    const quiste= new Quiste({lugar:req.body.lugar,datos:{tam:req.body.tam,fecha:req.body.fecha},cancer:req.body.cancer, removido:req.body.removido,_idpaciente:req.body._idpaciente})
    quiste.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//------- editar datos
//------- update de removido 

 //----Quiste eliminar 
 app.get('/deleteQ/:id',(req,res)=>{
    const id= req.params.id
    Quiste.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------   Analis de Sangre
//----analisangre
app.get('/findAN/uno/:_idpaciente',(req,res)=>{
    Analisis.find({_idpaciente:req.params._idpaciente},{_id:0})
    .then(doc=>{
        res.json({data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----analisis nuevo
app.post('/insertAN',(req,res)=>{
    const analis= new Analisis({_idpaciente:req.body._idpaciente,_idlaboratorio:req.body._idlaboratorio,estudio:{fechaToma:req.body.fechaToma,nombrestudio:req.body.nombrestudio,resultado:req.body.resultado,variacion:req.body.variacion,variacion2:req.body.variacion2}})
    analis.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Analisis de sangre eliminar 
app.get('/deleteAN/:id',(req,res)=>{
    const id= req.params.id
    Analisis.findByIdAndDelete({_idpaciente:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
    
 })



 //////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------ Metodo Anticonceptivo
//----metodoanti
app.get('/findMA/uno/:_idpaciente',(req,res)=>{
    Anticonceptivos.find({_idpaciente:req.params._idpaciente},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Metodos Anticonceptivos nuevos
app.post('/insertMA',(req,res)=>{
    const metodo= new Anticonceptivos ({_idpaciente:req.body._idpaciente,metodo:req.body.metodo,fechainicio:req.body.fechainicio,efectividad:req.body.efectividad,efectos:req.body.efectos})
metodo.save()
.then(doc=>{
    console.log('infor insertada',)
    res.json({response:'succes',data:doc})
})
.catch(err=>{
    console.log(' error en la consulta', err.message)
})
})
 //----Metodo Anticonceptivo eliminar
 app.get('/deleteMA/:id',(req,res)=>{
    const id= req.params.id
    Anticonceptivos.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })


 //////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------ Antecendees
//----antecedentes
app.get('/findAM/uno/:_idpaciente',(req,res)=>{
    Antecedentes.find({_idpaciente:req.params_idpaciente},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----antecedente medicos nuevos
app.post('/insertAM',(req,res)=>{
    const ante= new Antecedentes({_idpaciente:req.body._idpaciente,afecciones:{tipo:req.body.tipo,fechainicio:req.body.fechainicio},medicamentos:[req.body.medicamentos],habitos:[req.body.habitos],antecedentes:{parentezco:req.body.parentezco,enfermedad:req.body.enfermedad,edad:req.body.edad},relaciones:{ultimafecha:req.body.ultimafecha,nparejas:req.body.nparejas,frecuencia:req.body.frecuencia},embarazo:{aliviofecha:req.body.aliviofecha,sexo:req.body.sexo,complicaciones:[req.body.complicaciones]},aborto:{abortofecha:req.body.abortofecha,causa:req.body.causa}})
    ante.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Antecedentes eliminar
app.get('/deleteAM/:id',(req,res)=>{
    const id= req.params.id
    Antecedentes.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })



//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------ Laboratorios
//----laboratorios
app.get('/findLAB',(req,res)=>{
    Laboratorios.find({},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----laboratorios
app.get('/findLAB/uno/:id',(req,res)=>{
    Laboratorios.find({_id:req.params.id},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Laboratorios
app.post('/insertLAB',(req,res)=>{
    const lab= new Laboratorios({nombre:req.body.nombre,contacto:{tel:req.body.tel},horario:req.body.horario,domicilio:{calle:req.body.calle,numero:req.body.numero,colonia:req.body.colonia,cp:req.body.cp,municipio:req.body.municipio,estado:req.body.estado,pais:req.body.pais}})
    lab.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
 
 //----Laboratorios
 app.get('/deleteLAB/:id',(req,res)=>{
    const id= req.params.id
    Laboratorios.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 

 
////////////////////////////////////
app.listen(3001)
console.log('server ON')